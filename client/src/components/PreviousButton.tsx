import { useFetchDataContext } from "../context/FetchDataContext";

function PreviousButton() {
  const { musicHistory, setMusicHistory } = useFetchDataContext();
  const { musicList, setMusicList } = useFetchDataContext();

  function handlePrevious() {
    if (musicHistory.length > 0) {
      const previousMusic = musicHistory[musicHistory.length - 1];
      setMusicList([previousMusic]);
      setMusicHistory(musicHistory.slice(0, musicHistory.length - 1));
    } else {
      console.log("No previous music data available.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          handlePrevious();
        }}
      >
        ⏮️
      </button>
    </div>
  );
}

export default PreviousButton;
