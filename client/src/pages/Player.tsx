import { useFetchDataContext } from "../context/FetchDataContext";
import DisplaySelectedTagsOnPlayer from "../components/DisplaySelectedTagsOnPlayer";

const Player = () => {
  const { musicList } = useFetchDataContext();
  console.log(musicList);

  return (
    <div>
      <DisplaySelectedTagsOnPlayer />
    </div>
  );
};

export default Player;
