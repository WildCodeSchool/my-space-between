import { useMusicDataContext } from "../context/MusicContext";
import { PopularityLevelsContext } from "../context/PopularityLevelsContext";
import { useFetchDataContext } from "../context/FetchDataContext";
import { useContext } from "react";

function NextButton() {
  const { bubbleTags } = useMusicDataContext();
  const popularityLevelsContext = useContext(PopularityLevelsContext);
  const popularityFilter = popularityLevelsContext?.popularityFilter;
  const { fetchMusicData, loading, error } = useFetchDataContext();

  const handleDiscover = async () => {
    await fetchMusicData(
      bubbleTags,
      String(popularityFilter) || "defaultPopularity",
      []
    );
    if (!loading && !error) {
    }
  };

  return (
    <div>
      <button
        type="button"
        className="nextButton"
        onClick={() => {
          handleDiscover();
        }}
      >
        ⏭️
      </button>
    </div>
  );
}

export default NextButton;
