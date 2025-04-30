import SpotifyPlayer from "../components/SpotifyPlayer";
import { useFetchDataContext } from "../context/FetchDataContext";
import styles from "./Player.module.css";
import { useState } from "react";
import DisplayPopularityFilterOnPlayer from "../components/DisplayPopularityFilterOnPlayer";
import DisplaySelectedTagsOnPlayer from "../components/DisplaySelectedTagsOnPlayer";
import ArtistInfo from "../components/ArtistInfo";

const Player = () => {
  const { musicList } = useFetchDataContext();

  const [isOpen, setIsOpen] = useState(false);
  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className={styles.GlobalPlayer}>
        {musicList.length > 0 ? (
          musicList.map((item) => (
            <div key={item.id}>
              <p className={styles.playerId}>ID: {item.id}</p>
              <div className={styles.windowPlayer}>
                <SpotifyPlayer uri={item.url} />
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </section>
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
