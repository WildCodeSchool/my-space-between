import { useFetchDataContext } from "../context/FetchDataContext";
import DisplaySelectedTagsOnPlayer from "../components/DisplaySelectedTagsOnPlayer";

const Player = () => {
  const { musicList } = useFetchDataContext();
  console.log(musicList);

  return (
    <div>
      <DisplaySelectedTagsOnPlayer />
      {musicList.length > 0 ? (
        musicList.map((item) => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>Popularity: {item.popularity}</p>
            <p>
              URL:{" "}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </p>
            <p>Name: {item.name}</p>
            <p>Artist: {item.artist}</p>
            {item.image && <img src={item.image} alt={item.name} />}
            <p>Genre: {item.genre}</p>
            <p>Followers: {item.followers}</p>
            {item.artistImage && (
              <img src={item.artistImage} alt={`${item.artist}'s image`} />
            )}
            <div>
              <h3>Albums:</h3>
              {item.albums.map((album, index) => (
                <div key={index}>
                  <p>Album Name: {album.name}</p>
                  {album.image && <img src={album.image} alt={album.name} />}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Player;
