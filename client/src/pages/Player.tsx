import { useFetchDataContext } from "../context/FetchDataContext";
import DisplayPopularityFilterOnPlayer from "../components/DisplayPopularityFilterOnPlayer";

const Player = () => {
  const { musicList } = useFetchDataContext();

  return (
    <>
      <div>
        <DisplayPopularityFilterOnPlayer />
      </div>
    </>
  );
};

export default Player;
