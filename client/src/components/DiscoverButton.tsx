import styles from "../components/DiscoverButton.module.css";
import { useMusicContext } from "../context/MusicContext";
import { useFetchDataContext } from "../context/FetchDataContext";
import { useNavigate } from "react-router-dom";

export const getAccessToken = async () => {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET as string;

  const AUTH_URL = "https://accounts.spotify.com/api/token";

  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`Erreur d'authentification : ${response.status}`);
    }

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    throw error;
  }
};

interface SelectedMusic {
  id: string;
  popularity: number;
  url: string;
  name: string;
  artist: string;
  image: string;
  artistImage: string;
  genre: string;
  followers: number;
  albums: any[];
}

interface DiscoverButtonProps {
  bubbleTags: string[];
}

const DiscoverButton: React.FC<DiscoverButtonProps> = ({ bubbleTags }) => {
  const navigate = useNavigate();
  const { tags } = useMusicContext();

  const { musicList, setMusicList, loading, setLoading, error, setError } =
    useFetchDataContext();

  const fetchMusicData = async (bubbleTags: string[]) => {
    const tagsIfEmpty = [];
    for (let i = 0; i < 5; i++) {
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      tagsIfEmpty.push(randomTag);
    }

    const randomOffset = Math.floor(Math.random() * 150) + 1;
    const API_URL =
      bubbleTags.length === 0
        ? `https://api.spotify.com/v1/search?q=${tagsIfEmpty.join(
            "+"
          )}&type=track&limit=1&offset=${randomOffset}`
        : `https://api.spotify.com/v1/search?q=${bubbleTags.join(
            "+"
          )}&type=track&limit=1&offset=${randomOffset}`;
    console.log("API URL:", API_URL);
    setLoading(true);
    setError(null);

    try {
      const token = await getAccessToken();

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (
        result.tracks &&
        Array.isArray(result.tracks.items) &&
        result.tracks.items.length > 0
      ) {
        const item = result.tracks.items[0];
        const artistId = item.artists[0]?.id;

        if (!artistId) {
          throw new Error("Artist ID not found");
        }

        const artistData = await fetchArtistData(artistId, token);
        const albumsData = await fetchAlbumsData(artistId, token);

        const newSelectedMusic: SelectedMusic = {
          id: item.id,
          popularity: item.popularity,
          url: item.external_urls.spotify,
          name: item.name,
          artist: item.artists[0]?.name,
          image: item.album.images[0]?.url || "",
          artistImage: artistData.artistImage,
          genre: artistData.genre,
          followers: artistData.followers,
          albums: albumsData,
        };

        setMusicList([newSelectedMusic]);
        console.log("Updated musicList:", [newSelectedMusic]);
      } else {
        console.log("No data found, retrying...");
        fetchMusicData(bubbleTags);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistData = async (artistId: string, token: string) => {
    const ARTIST_API_URL = `https://api.spotify.com/v1/artists/${artistId}`;
    try {
      const response = await fetch(ARTIST_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const artistData = await response.json();
      return {
        artistImage: artistData.images[0]?.url || "",
        followers: artistData.followers?.total || 0,
        genre: artistData.genres?.[0] || "Unknown",
      };
    } catch (err) {
      console.error("Error fetching artist data:", err);
      throw err;
    }
  };

  const fetchAlbumsData = async (artistId: string, token: string) => {
    const ALBUMS_API_URL = `https://api.spotify.com/v1/artists/${artistId}/albums`;
    try {
      const response = await fetch(ALBUMS_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const albumsData = await response.json();
      return albumsData.items.map((album: any) => ({
        name: album.name,
        image: album.images[0]?.url || "",
      }));
    } catch (err) {
      console.error("Error fetching albums data:", err);
      throw err;
    }
  };

  const handleDiscover = async () => {
    await fetchMusicData(bubbleTags);
    navigate("/player");
  };

  return (
    <div>
      <button
        type="button"
        className={styles.discoverButton}
        onClick={handleDiscover}
      >
        Go Discover
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DiscoverButton;
