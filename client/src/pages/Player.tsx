import { useFetchDataContext } from "../context/FetchDataContext";
import DisplaySelectedTagsOnPlayer from "../components/DisplaySelectedTagsOnPlayer";

const Player = () => {
  const { musicList } = useFetchDataContext();

  return (
    <div>
      <DisplaySelectedTagsOnPlayer />
    </div>
  );
};

export default Player;
