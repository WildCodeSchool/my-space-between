import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { SelectedMusicModel } from "../models/SelectedMusic";

interface FetchDataContextType {
  musicList: SelectedMusicModel[];
  setMusicList: React.Dispatch<React.SetStateAction<SelectedMusicModel[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  fetchMusicData: (
    bubbleTags: string[],
    filter: string,
    tags: string[]
  ) => Promise<void>;
  fetchArtistData: (artistId: string, token: string) => Promise<any>;
  fetchAlbumsData: (artistId: string, token: string) => Promise<any>;
}

const FetchDataContext = createContext<FetchDataContextType | undefined>(
  undefined
);

export const FetchDataProvider = ({ children }: { children: ReactNode }) => {
  const [musicList, setMusicList] = useState<SelectedMusicModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = async () => {
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
        throw new Error(`Authentication error: ${response.status}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  };

  const fetchMusicData = async (
    bubbleTags: string[],
    filter: string,
    tags: string[]
  ) => {
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
        const popularity = item.popularity;

        const isValid = () => {
          if (filter === "Unknown") return popularity >= 0 && popularity <= 5;
          if (filter === "Low") return popularity >= 6 && popularity <= 15;
          if (filter === "Medium") return popularity >= 16 && popularity <= 30;
          return true;
        };

        if (!isValid()) {
          return fetchMusicData(bubbleTags, filter, tags);
        }

        const artistId = item.artists[0]?.id;
        if (!artistId) {
          throw new Error("Artist ID not found");
        }

        const artistData = await fetchArtistData(artistId, token);
        const albumsData = await fetchAlbumsData(artistId, token);

        const newSelectedMusic = new SelectedMusicModel(
          item.id,
          item.popularity,
          item.external_urls.spotify,
          item.name,
          item.artists[0]?.name,
          item.album.images[0]?.url || "",
          artistData.artistImage,
          artistData.genre,
          artistData.followers,
          albumsData
        );

        setMusicList([newSelectedMusic]);

        if (bubbleTags.length === 0) {
          bubbleTags.push(...tagsIfEmpty);
        }
      } else {
        fetchMusicData(bubbleTags, filter, tags);
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
        link: album.external_urls.spotify || "",
      }));
    } catch (err) {
      console.error("Error fetching albums data:", err);
      throw err;
    }
  };

  return (
    <FetchDataContext.Provider
      value={{
        musicList,
        setMusicList,
        loading,
        setLoading,
        error,
        setError,
        fetchMusicData,
        fetchArtistData,
        fetchAlbumsData,
      }}
    >
      {children}
    </FetchDataContext.Provider>
  );
};

export const useFetchDataContext = () => {
  const context = useContext(FetchDataContext);
  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};
