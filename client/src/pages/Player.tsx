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
    // check localstorage "spotifyProduct" si la cle existe en free ou n'existe pas, envoie le lecteur iframe sinon envoie le lecteur SDK
    //affichage conditionnel a la place de trackplayingcard , iframe-player
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
