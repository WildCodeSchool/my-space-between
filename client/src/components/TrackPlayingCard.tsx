import styles from "./TrackPlayingCard.module.css";
import { useFetchDataContext } from "../context/FetchDataContext";
import SpotifyPlayer from "./SpotifyPlayer";
import AddToFavoriteButton from "./AddToFavoriteButton";

function TrackPlayingCard() {
  const { musicList } = useFetchDataContext();

  return (
    <section className={styles.globalPlayer}>
      {musicList.length > 0 ? (
        musicList.map((item) => (
          <div key={item.id} className={styles.card}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
            >
              <img src={item.image} alt={item.name} className={styles.image} />
            </a>
            <h2 className={styles.trackName}>
              {item.name.length > 24
                ? item.name.slice(0, 24) + "..."
                : item.name}
            </h2>
            <h3 className={styles.artist}>{item.artist}</h3>
            <div className={styles.windowPlayer}>
              <SpotifyPlayer uri={item.url} />
              <div className={styles.addToFavoriteButton}>
                <AddToFavoriteButton music={item} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </section>
  );
}

export default TrackPlayingCard;
