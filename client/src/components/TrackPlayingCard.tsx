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
            <img src={item.image} alt={item.name} className={styles.image} />
            <h2 className={styles.trackName}>{item.name}</h2>
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
