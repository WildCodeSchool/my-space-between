import { useState } from "react";
import { useFetchDataContext } from "../context/FetchDataContext";
import styles from "./PreviousButton.module.css";

function PreviousButton() {
  const { musicHistory, setMusicHistory } = useFetchDataContext();
  const { musicList, setMusicList } = useFetchDataContext();
  const [showMessage, setShowMessage] = useState(false);

  function handlePrevious() {
    if (musicHistory.length > 0) {
      const previousMusic = musicHistory[musicHistory.length - 1];
      setMusicList([previousMusic]);
      setMusicHistory(musicHistory.slice(0, musicHistory.length - 1));
    } else {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          handlePrevious();
        }}
      >
        ⏮️
      </button>
      {showMessage && (
        <p className={styles.message}>Pas de musique précédente</p>
      )}
    </div>
  );
}

export default PreviousButton;
