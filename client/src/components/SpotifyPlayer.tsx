import { useEffect, useState, useContext } from "react";
import { useFetchDataContext } from "../context/FetchDataContext";
import styles from "./SpotifyPlayer.module.css";
import NextButton from "./NextButton";
import { useMusicDataContext } from "../context/MusicContext";
import { PopularityLevelsContext } from "../context/PopularityLevelsContext";
import PreviousButton from "./PreviousButton";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

const SpotifyPlayer = ({ uri }: { uri: string }) => {
  const { musicList } = useFetchDataContext();

  const [current_track, setTrack] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setPlayerReady] = useState(false);
  const [hasFetchedNext, setHasFetchedNext] = useState(false);

  const token = localStorage.getItem("spotifyAccessToken");

  const playTrack = async (device_id: string, trackUri: string) => {
    if (!token) {
      console.error("No Spotify access token found.");
      alert("Spotify access token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: [trackUri],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Failed to start playback:",
          response.statusText,
          errorData
        );
        if (response.status === 401) {
          alert("Spotify token is invalid or expired. Please log in again.");
        }
      }
    } catch (error) {
      console.error("Error starting playback:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      console.error("No Spotify access token found.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    let spotifyPlayer: any = null;

    window.onSpotifyWebPlaybackSDKReady = () => {
      spotifyPlayer = new window.Spotify.Player({
        name: "Mon super lecteur Web",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      spotifyPlayer.connect().then((success: boolean) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );

          setPlayer(spotifyPlayer);

          spotifyPlayer.addListener(
            "ready",
            ({ device_id }: { device_id: string }) => {
              console.log("Ready with Device ID", device_id);
              setDeviceId(device_id);
              setPlayerReady(true);
            }
          );

          spotifyPlayer.addListener(
            "not_ready",
            ({ device_id }: { device_id: string }) => {
              console.log("Device ID has gone offline", device_id);
              setPlayerReady(false);
            }
          );

          spotifyPlayer.addListener(
            "player_state_changed",
            async (state: any) => {
              if (!state) {
                console.warn("No player state available yet.");
                return;
              }

              setTrack(state.track_window.current_track);
              setIsPaused(state.paused);
              setPosition(state.position);
              setDuration(state.duration);

              try {
                if (
                  isPlayerReady &&
                  typeof spotifyPlayer.getCurrentState === "function"
                ) {
                  const currentState = await spotifyPlayer.getCurrentState();
                  if (currentState) {
                    setActive(true);
                  } else {
                    console.warn("No active Spotify state found.");
                    setActive(false);
                  }
                }
              } catch (error) {
                console.error("Error getting current state:", error);
                setActive(false);
              }
            }
          );
        } else {
          console.error("Failed to connect to Spotify Web Playback SDK");
        }
      });
    };

    return () => {
      if (spotifyPlayer) {
        console.log("Disconnecting Spotify player...");
        spotifyPlayer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (deviceId && musicList.length > 0 && isPlayerReady) {
      const newTrackId = musicList[0].id;
      const currentTrackId = current_track?.id;

      if (newTrackId !== currentTrackId) {
        console.log("Playing new track after fetch:", newTrackId);

        setTrack({
          name: musicList[0].name,
          album: { image: { url: musicList[0].image } },
          artist: { name: musicList[0].artist },
          id: musicList[0].id,
        });

        playTrack(deviceId, `spotify:track:${newTrackId}`);
      }
    }
  }, [musicList, deviceId, isPlayerReady, current_track]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!isPaused) {
      interval = setInterval(() => {
        setPosition((prevPosition) => {
          const newPosition = prevPosition + 1000;

          if (
            duration > 0 &&
            newPosition >= duration - 2000 &&
            !hasFetchedNext
          ) {
            console.log("🎵 La musique touche à sa fin !");
            setHasFetchedNext(true);
            handleDiscover();
          }

          if (newPosition < duration) {
            return newPosition;
          } else {
            return duration;
          }
        });
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [isPaused, duration, hasFetchedNext]);

  const togglePlay = async () => {
    if (!player || !deviceId || !isPlayerReady) {
      console.error("Player or device not ready yet.");
      alert("Lecteur Spotify non prêt. Attends quelques secondes...");
      return;
    }

    try {
      const state = await player.getCurrentState();
      if (!state) {
        console.error(
          "No active device. Please start playback on Web Player first."
        );
        alert(
          "Spotify Web Player n'est pas actif. Connecte-toi à ton compte Spotify !"
        );
        return;
      }

      if (state.paused) {
        console.log("Attempting to resume playback...");
        await player.resume();
        console.log("Playback resumed.");
        setIsPaused(false);
      } else {
        console.log("Attempting to pause playback...");
        await player.pause();
        console.log("Playback paused.");
        setIsPaused(true);
      }
    } catch (error) {
      console.error("Error during togglePlay:", error);
    }
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const { bubbleTags } = useMusicDataContext();
  const popularityLevelsContext = useContext(PopularityLevelsContext);
  const popularityFilter = popularityLevelsContext?.popularityFilter;
  const { fetchMusicData, loading, error } = useFetchDataContext();

  const handleDiscover = async () => {
    try {
      await fetchMusicData(
        bubbleTags,
        String(popularityFilter) || "defaultPopularity",
        []
      );
      if (!loading && !error) {
        console.log("Data fetched successfully. Proceeding to next step.");
      } else {
        console.error("Failed to fetch music data. Navigation aborted.");
      }
    } catch (err) {
      console.error("Error during fetch:", err);
    }
  };

  const skipTime = async (milliseconds: number) => {
    if (!player || !isPlayerReady) {
      console.error("Player not ready for seek action");
      return;
    }

    try {
      const state = await player.getCurrentState();
      if (!state) {
        console.error("No player state found");
        return;
      }

      let newPosition = state.position + milliseconds;
      if (newPosition < 0) newPosition = 0;
      if (newPosition > state.duration) newPosition = state.duration;

      await player.seek(newPosition);
      console.log(`Skipped to ${newPosition} ms`);
    } catch (error) {
      console.error("Error skipping in track:", error);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.playerSection}>
        {deviceId ? (
          <div className={styles.playerContainer}>
            <div className={styles.controls}>
              <PreviousButton />

              <button
                className={styles.button}
                onClick={togglePlay}
                disabled={!player || !deviceId}
              >
                {isPaused ? "▶️" : "⏸️"}
              </button>

              <NextButton />
            </div>
            <div className={styles.controls}>
              <button onClick={() => skipTime(-10000)}>-10s ⏪</button>
              <button onClick={() => skipTime(10000)}>⏩ +10s</button>
            </div>

            <div className={styles.timeInfo}>
              {formatTime(position)} / {formatTime(duration)}
            </div>
          </div>
        ) : (
          <p>Connecting to Spotify...</p>
        )}
      </section>
    </div>
  );
};

export default SpotifyPlayer;
