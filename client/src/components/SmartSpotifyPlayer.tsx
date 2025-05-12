import { useEffect, useState } from "react";
import SpotifyPlayer from "./SpotifyPlayer";

const SmartSpotifyPlayer = ({ uri }: { uri: string }) => {
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyAccessToken");
    setToken(storedToken);

    if (!storedToken) {
      console.warn("No Spotify access token found.");
      setIsPremium(false);
      return;
    }

    const checkUserStatus = async () => {
      try {
        const res = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch user profile:", res.statusText);
          setIsPremium(false);
          return;
        }

        const data = await res.json();
        setIsPremium(data.product === "premium");
      } catch (err) {
        console.error("Error checking Spotify user status:", err);
        setIsPremium(false);
      }
    };

    checkUserStatus();
  }, []);

  if (isPremium === null) {
    return <p>Chargement du lecteur...</p>;
  }

  if (isPremium) {
    return <SpotifyPlayer uri={uri} />;
  } else {
    const trackId = uri.split(":").pop();
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

    return (
      <iframe
        title="Spotify Embed Player"
        src={embedUrl}
        width="100%"
        height="80"
        allow="encrypted-media"
        style={{ borderRadius: "12px" }}
      ></iframe>
    );
  }
};

export default SmartSpotifyPlayer;
