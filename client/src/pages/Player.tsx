import styles from "./Player.module.css";
import { useState, useEffect } from "react";
import DisplayPopularityFilterOnPlayer from "../components/DisplayPopularityFilterOnPlayer";
import DisplaySelectedTagsOnPlayer from "../components/DisplaySelectedTagsOnPlayer";
import ArtistInfo from "../components/ArtistInfo";
import TrackPlayingCard from "../components/TrackPlayingCard";

const Player = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    const navigationEntry = navEntries[0] as PerformanceNavigationTiming;

    const wasReloaded = navigationEntry.type === "reload";

    if (wasReloaded && window.location.pathname === "/player") {
      window.location.replace("/");
    }
  }, []);

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <TrackPlayingCard />
      </div>
      <div>
        <DisplaySelectedTagsOnPlayer />
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
