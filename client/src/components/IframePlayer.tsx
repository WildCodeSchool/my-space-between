import styles from "./IframePlayer.module.css";
import { useFetchDataContext } from "../context/FetchDataContext";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";

const IframePlayer = () => {
  const { musicList } = useFetchDataContext();

  if (!musicList || musicList.length === 0) {
    return <p>player loading...</p>;
  }

  const trackId = musicList[0].id;
  const musicUrl = `https://open.spotify.com/embed/track/${trackId}`;

  return (
    <div className={styles.playerFrame}>
      <PreviousButton />
      <iframe
        src={musicUrl}
        width="280"
        height="450"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <NextButton />
    </div>
  );
};

export default IframePlayer;
