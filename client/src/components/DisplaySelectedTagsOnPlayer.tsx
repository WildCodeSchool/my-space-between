import styles from "./DisplaySelectedTagsOnPlayer.module.css";
import { useMusicDataContext } from "../context/MusicContext";

function DisplaySelectedTagsOnPlayer() {
  const { bubbleTags } = useMusicDataContext();
  const selectedTags = bubbleTags;

  return (
    <div className={styles.selectedTagsContainer}>
      <ul className={styles.selectedTagsList}>
        {selectedTags.map((tag, index) => (
          <li key={index} className={styles.selectedTagItem}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplaySelectedTagsOnPlayer;
