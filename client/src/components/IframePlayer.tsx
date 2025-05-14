import styles from "./IframePlayer.module.css";
import { useFetchDataContext } from "../context/FetchDataContext";

const IframePlayer = () => {
  const { musicList } = useFetchDataContext();

  const trackId = musicList[0].id;
  const musicUrl = `https://open.spotify.com/embed/track/${trackId}`;

  return (
    <div className={styles.playerFrame}>
      <iframe
        src={musicUrl}
        width="40%"
        height="450"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default IframePlayer;
