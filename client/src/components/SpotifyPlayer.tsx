import { useEffect, useState } from "react";
import { useFetchDataContext } from "../context/FetchDataContext";

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

  console.log("current track : ", current_track);

  // 🔥 Nouvelle fonction pour jouer un morceau
  const playTrack = async (device_id: string) => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No Spotify access token found.");
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
        console.error("Failed to start playback:", response.statusText);
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

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Mon super lecteur Web",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      // --- Events
      player.addListener("ready", ({ device_id }: { device_id: string }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);

        // 🔥 Dès que prêt, joue la track
        playTrack(device_id);
      });

      player.addListener(
        "not_ready",
        ({ device_id }: { device_id: string }) => {
          console.log("Device ID has gone offline", device_id);
        }
      );

      player.addListener("player_state_changed", (state: any) => {
        if (!state) return;
        setTrack(state.track_window.current_track);
        setIsPaused(state.paused);
        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
        console.log("Player state changed:", state);
      });

      player.connect();
    };

    // Nettoyage (si le composant est démonté)
    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, []);

  const togglePlay = async () => {
    if (player) {
      const state = await player.getCurrentState();
      if (!state) {
        console.error("User is not playing music through the Web Playback SDK");
        return;
      }

      if (state.paused) {
        player.resume();
      } else {
        player.pause();
      }
    }
  };

  return (
    <section>
      {deviceId ? (
        <div className="container">
          <div className="main-wrapper">
            {/* <img
              src={current_track.album.image.url}
              className="now-playing__cover"
              alt=""
            /> */}

            <div className="now-playing__side">
              {/* <div className="now-playing__name">{current_track.name}</div> */}

              {/* <div className="now-playing__artist">
                {current_track?.artist.name}
              </div> */}
            </div>
          </div>
          <button
            className="btn-spotify"
            onClick={() => {
              player.previousTrack();
            }}
          >
            &lt;&lt;
          </button>

          <button
            className="btn-spotify"
            onClick={() => {
              togglePlay();
            }}
          >
            {isPaused ? "PLAY" : "PAUSE"}
          </button>

          <button
            className="btn-spotify"
            onClick={() => {
              player.nextTrack();
            }}
          >
            &gt;&gt;
          </button>
        </div>
      ) : (
        <p>Connecting to Spotify...</p>
      )}
    </section>
  );
};

export default SpotifyPlayer;
