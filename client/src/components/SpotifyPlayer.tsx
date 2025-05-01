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

  const track = {
    name: musicList[0].name,
    album: {
      image: { url: musicList[0].image },
    },
    artist: { name: musicList[0].artist },
  };

  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [position, setPosition] = useState(0); // in milliseconds
  const [duration, setDuration] = useState(0); // in milliseconds

  console.log("current track : ", current_track);

  const playTrack = async (device_id: string) => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No Spotify access token found.");
      alert("Spotify access token is missing. Please log in again.");
      return;
    }

    console.log("Using Spotify access token:", token);

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

      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener(
        "ready",
        ({ device_id }: { device_id: string }) => {
          console.log("Ready with Device ID", device_id);
          setDeviceId(device_id);

          setTimeout(() => {
            playTrack(device_id);
          }, 1000);
        }
      );

      spotifyPlayer.addListener(
        "not_ready",
        ({ device_id }: { device_id: string }) => {
          console.log("Device ID has gone offline", device_id);
        }
      );

      spotifyPlayer.addListener("player_state_changed", (state: any) => {
        if (!state) return;

        setTrack(state.track_window.current_track);
        setIsPaused(state.paused);

        setPosition(state.position);
        setDuration(state.duration);

        if (spotifyPlayer) {
          spotifyPlayer
            .getCurrentState()
            .then((state: any | null) => {
              if (!state) {
                setActive(false);
              } else {
                setActive(true);
              }
            })
            .catch((error: Error) => {
              console.error("Error getting current state:", error);
              setActive(false);
            });
        } else {
          console.error("Spotify player is not initialized.");
        }

        console.log("Player state changed:", state);
      });

      spotifyPlayer.connect();
    };

    return () => {
      if (spotifyPlayer) {
        console.log("Disconnecting Spotify player...");
        spotifyPlayer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        setPosition((prevPosition) => {
          if (prevPosition + 1000 < duration) {
            return prevPosition + 1000; // Ajoute 1 seconde
          } else {
            return duration; // Reste bloqué à la fin du morceau
          }
        });
      }, 1000); // toutes les 1 secondes
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Nettoyage quand on change
  }, [isPaused, duration]);

  const togglePlay = async () => {
    if (!player) {
      console.error("No player initialized yet.");
      return;
    }

    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No Spotify access token found.");
      alert("Spotify access token is missing. Please log in again.");
      return;
    }

    try {
      const state = await player.getCurrentState();
      if (!state) {
        console.error(
          "No active device. Please start playback on Web Player first."
        );
        alert(
          "Spotify Web Player n'est pas actif. Clique sur 'Connecter' sur ton compte Spotify !"
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

  window.addEventListener("popstate", function (event) {
    console.log("Retour arrière détecté");
    location.reload();
  });

  function resetPlayerState() {
    console.log("Réinitialisation de l'état du player");
  }

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
                onClick={() => {
                  togglePlay();
                }}
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
