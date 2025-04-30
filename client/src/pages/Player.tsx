import { useState } from "react";
import { useFetchDataContext } from "../context/FetchDataContext";
import DisplaySelectedTagsOnPlayer from "../components/DisplaySelectedTagsOnPlayer";
import ArtistInfo from "../components/ArtistInfo";
import styles from "./Player.module.css";

const Player = () => {
  const { musicList } = useFetchDataContext();

  const [isOpen, setIsOpen] = useState(false);
  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <DisplaySelectedTagsOnPlayer />
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
