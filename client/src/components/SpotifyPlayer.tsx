import { useEffect, useState } from "react";
import { useFetchDataContext } from "../context/FetchDataContext";
import styles from "./SpotifyPlayer.module.css";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

const SpotifyPlayer = ({ uri }: { uri: string }) => {
  const { musicList } = useFetchDataContext();

  const [current_track, setTrack] = useState<any>(null);

  useEffect(() => {
    if (musicList.length > 0) {
      setTrack({
        name: musicList[0].name,
        album: {
          image: { url: musicList[0].image },
        },
        artist: { name: musicList[0].artist },
      });
    }
  }, [musicList]);

  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setPlayerReady] = useState(false);

  console.log("current track : ", current_track);

  const playTrack = async (device_id: string) => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No Spotify access token found.");
      alert("Spotify access token is missing. Please log in again.");
      return;
    }

    const trackId = uri.split("/").pop();
    const trackUri = `spotify:track:${trackId}`;

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
    const token = localStorage.getItem("spotifyAccessToken");

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

              setTimeout(() => {
                playTrack(device_id);
              }, 1000);
            }
          );

          spotifyPlayer.addListener(
            "not_ready",
            ({ device_id }: { device_id: string }) => {
              console.log("Device ID has gone offline", device_id);
              setPlayerReady(false); // Mark the player as not ready
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
                } else {
                  console.warn(
                    "Player is not ready or getCurrentState is unavailable."
                  );
                }
              } catch (error) {
                console.error("Error getting current state:", error);
                setActive(false);
              }

              console.log("Player state changed:", state);
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
    let interval: NodeJS.Timeout | undefined;

    if (!isPaused) {
      interval = setInterval(() => {
        setPosition((prevPosition) => {
          if (prevPosition + 1000 < duration) {
            return prevPosition + 1000;
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
  }, [isPaused, duration]);

  const togglePlay = async () => {
    if (!player || !deviceId || !isPlayerReady) {
      console.error("Player or device not ready yet.");
      alert("Lecteur Spotify non prêt. Attends quelques secondes...");
      return;
    }

    try {
      if (typeof player.getCurrentState !== "function") {
        console.warn("getCurrentState is not available on the player.");
        return;
      }

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

  interface ErrorEvent {
    message: string;
  }

  function handleError(error: ErrorEvent): void {
    if (error.message.includes("404")) {
      console.log(
        "Erreur 404 détectée : Relancer la page ou réinitialiser la session."
      );

      location.reload();
    } else {
      console.log("Autre erreur:", error);
    }
  }

  window.addEventListener("error", function (event) {
    if (event.message.includes("404")) {
      handleError(event);
    }
  });

  window.addEventListener("popstate", function () {
    console.log("Retour arrière détecté");
    location.reload();
  });

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={styles.container}>
      <section className={styles.playerSection}>
        {deviceId ? (
          <div className={styles.playerContainer}>
            <div className={styles.controls}>
              <button
                className={styles.button}
                onClick={() => {
                  player.previousTrack();
                }}
              >
                ⏮️
              </button>

              <button
                className={styles.button}
                onClick={togglePlay}
                disabled={!player || !deviceId}
              >
                {isPaused ? "▶️" : "⏸️"}
              </button>

              <button
                className={styles.button}
                onClick={() => {
                  player.nextTrack();
                }}
              >
                ⏭️
              </button>
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
