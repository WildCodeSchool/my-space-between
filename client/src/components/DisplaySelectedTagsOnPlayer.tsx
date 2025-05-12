import styles from "./DisplaySelectedTagsOnPlayer.module.css";
import { useMusicDataContext } from "../context/MusicContext";

function DisplaySelectedTagsOnPlayer() {
  const { bubbleTags } = useMusicDataContext();

  return (
    <>
      <div className={styles.bubbleTagsContainer}>
        <ul className={styles.bubbleTagsList}>
          {bubbleTags.map((tag, index) => {
            const classname = `bubbleTag${index + 1}`;
            return (
              <li key={index + 1} className={styles[classname]}>
                {tag}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default DisplaySelectedTagsOnPlayer;
