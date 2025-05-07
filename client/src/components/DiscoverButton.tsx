import styles from "../components/DiscoverButton.module.css";
import { useMusicDataContext } from "../context/MusicContext";
import { useFetchDataContext } from "../context/FetchDataContext";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

interface DiscoverButtonProps {
  bubbleTags: string[];
  filter: string;
}

const DiscoverButton: React.FC<DiscoverButtonProps> = ({
  bubbleTags,
  filter,
}) => {
  const navigate = useNavigate();
  const { tags } = useMusicDataContext();
  const { fetchMusicData, loading, error, musicHistory, setMusicHistory } =
    useFetchDataContext();

  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      const doFetch = async () => {
        try {
          await fetchMusicData(bubbleTags, filter, tags);
          if (!loading && !error) {
            navigate("/player");
          } else {
            console.error("Failed to fetch music data. Navigation aborted.");
          }
        } catch (err) {
          console.error("Error during fetch:", err);
        }
      };
      doFetch();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  const handleDiscover = () => {
    setMusicHistory([]);
    setShouldFetch(true);
  };

  return (
    <div>
      <button
        type="button"
        className={styles.discoverButton}
        onClick={handleDiscover}
        disabled={loading}
      >
        {loading ? "Loading..." : "Discover"}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DiscoverButton;
