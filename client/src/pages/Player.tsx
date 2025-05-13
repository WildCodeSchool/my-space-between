import styles from "./Player.module.css";
import { useState, useEffect } from "react";
import DisplayPopularityFilterOnPlayer from "../components/DisplayPopularityFilterOnPlayer";
import DisplaySelectedTagsOnPlayer from "../components/DisplaySelectedTagsOnPlayer";
import ArtistInfo from "../components/ArtistInfo";
import TrackPlayingCard from "../components/TrackPlayingCard";
import IframePlayer from "../components/IframePlayer";

const Player = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [spotifyProduct, setSpotifyProduct] = useState<string | null>(null);

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    const navigationEntry = navEntries[0] as PerformanceNavigationTiming;
    const wasReloaded = navigationEntry.type === "reload";

    if (wasReloaded && window.location.pathname === "/player") {
      window.location.replace("/");
    }

    const product = localStorage.getItem("spotifyProduct");
    setSpotifyProduct(product);
  }, []);

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        {spotifyProduct === "premium" ? <TrackPlayingCard /> : <IframePlayer />}
      </div>

      <div>
        <DisplaySelectedTagsOnPlayer />
      </div>
      <div>
        <DisplayPopularityFilterOnPlayer />
      </div>

      <div className={`${isOpen ? styles.open : ""} ${styles.artistInfo}`}>
        <ArtistInfo />
      </div>

      <div className={styles.bottomButtons}>
        <button className={isOpen ? styles.clicked : ""} onClick={toggleButton}>
          Info
        </button>
      </div>
    </>
  );
};

export default Player;
