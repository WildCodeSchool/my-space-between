import SpotifyPlayer from "../components/SpotifyPlayer";
import { useFetchDataContext } from "../context/FetchDataContext";
import styles from "./Player.module.css";
import DisplaySelectedTagsOnPlayer from "../components/DisplaySelectedTagsOnPlayer";

const Player = () => {
  const { musicList } = useFetchDataContext();

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
              <section className={styles.sectionInfoPlayer}>
                {item.artistImage && (
                  <img
                    className={styles.pictureArtisteProfil}
                    src={item.artistImage}
                    alt={`${item.artist}'s image`}
                  />
                )}
                <p>Artist: {item.artist}</p>
                <p>Name: {item.name}</p>
                <p>Followers: {item.followers}</p>
                <p>Genre: {item.genre}</p>
                <p>Popularity: {item.popularity}</p>
                {item.image && (
                  <img
                    className={styles.pictureInPlayer}
                    src={item.image}
                    alt={item.name}
                  />
                )}
                <div className={styles.listAlbumPlayer}>
                  <h3>Albums:</h3>
                  {item.albums.map((album, index) => (
                    <div key={index}>
                      <p>Album Name: {album.name}</p>
                      {album.image && (
                        <img
                          className={styles.pictureAlbumPlayer}
                          src={album.image}
                          alt={album.name}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </section>
      <div>
        <DisplaySelectedTagsOnPlayer />
      </div>
    </>
  );
};

export default Player;
