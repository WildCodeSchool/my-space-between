import styles from "./ArtistInfo.module.css";
import { useFetchDataContext } from "../context/FetchDataContext";

const ArtistInfo = () => {
  const { musicList } = useFetchDataContext();

  return (
    <>
      <div className={styles.artistInfoContainer}>
        {musicList.length > 0 ? (
          musicList.map((item) => (
            <div key={item.id} className={styles.artistInfoCard}>
              <div className={styles.artistImage}>
                {" "}
                {item.artistImage && (
                  <img src={item.artistImage} alt={`${item.artist}'s image`} />
                )}{" "}
              </div>
              <h2>{item.artist} </h2>
              <p>{item.followers} followers</p>
              <p>Genre: {item.genre}</p>

              <div className={styles.albumsContainer}>
                <h3>Albums:</h3>
                <div className={styles.albumsList}>
                  {item.albums.map((album, index) => (
                    <div key={index}>
                      {album.image && (
                        <a
                          href={album.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={album.image} alt={album.name} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default ArtistInfo;
