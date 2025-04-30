import { useEffect, useState } from "react";

const SpotifyPlayer = ({ uri }: { uri: string }) => {
  const currentTrack = uri.split("/");
  const urlChunk = currentTrack[currentTrack.length - 1];
  const embedUrl = `https://open.spotify.com/embed/track/${urlChunk}`;

  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    };
  }, []);

  return (
    <>
      <iframe
        src={embedUrl}
        width="300"
        height="380"
        allow="encrypted-media"
        title="Spotify Player"
      ></iframe>
    </>
  );
};

export default SpotifyPlayer;
