import { useFetchDataContext } from "../context/FetchDataContext";
import DisplayPopularityFilterOnPlayer from "../components/DisplayPopularityFilterOnPlayer";
import DisplaySelectedTagsOnPlayer from "../components/DisplaySelectedTagsOnPlayer";


const Player = () => {
  const { musicList } = useFetchDataContext();

  return (

    <>
      <div>
        <DisplayPopularityFilterOnPlayer />
      </div>
    

    <div>
      <DisplaySelectedTagsOnPlayer />
    </div>
</>
  );
};

export default Player;
