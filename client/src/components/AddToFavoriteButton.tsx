import { useFetchDataContext } from "../context/FetchDataContext";
import { useState, useEffect } from "react";
import { SelectedMusicModel } from "../models/SelectedMusic";

function AddToFavoriteButton({ music }: { music: SelectedMusicModel }) {
  const accessToken = localStorage.getItem("spotifyAccessToken") || "";
  const { fetchMusicData } = useFetchDataContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const checkIfFavorite = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/tracks/contains?ids=${music.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavorite(data[0]);
      } else {
        console.error(
          "Failed to check favorite status:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Network error checking favorite status:", error);
    }
  };

  const handleAddToFavorite = async () => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/tracks", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [music.id] }),
      });

      if (response.ok) {
        setIsFavorite(true);
      } else {
        console.error("Failed to add to favorites:", await response.text());
      }
    } catch (error) {
      console.error("Network error adding to favorites:", error);
    }
  };

  const handleRemoveFromFavorite = async () => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/tracks", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [music.id] }),
      });

      if (response.ok) {
        setIsFavorite(false);
      } else {
        console.error(
          "Failed to remove from favorites:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Network error removing from favorites:", error);
    }
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFromFavorite();
    } else {
      handleAddToFavorite();
    }
  };

  useEffect(() => {
    checkIfFavorite();
  }, [music.id, accessToken]);

  return (
    <button onClick={handleToggleFavorite} className="add-to-favorite-button">
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}

export default AddToFavoriteButton;
