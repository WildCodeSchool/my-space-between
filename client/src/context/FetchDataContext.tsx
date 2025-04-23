import React, { createContext, useContext, useState } from "react";

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
  albums: { name: string; image: string }[];
}

interface FetchDataContextProps {
  data: SelectedMusic[];
  loading: boolean;
  error: string | null;
  fetchMusicData: (bubbleTags: string[]) => Promise<void>;
}

const FetchDataContext = createContext<FetchDataContextProps | undefined>(undefined);

export const FetchDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SelectedMusic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = async () => {
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;
    const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET as string;
    const AUTH_URL = "https://accounts.spotify.com/api/token";
    const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

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
  };

  const fetchMusicData = async (bubbleTags: string[]) => {
    const randomOffset = Math.floor(Math.random() * 10) + 1;
    const API_URL = bubbleTags.length === 0
      ? `https://api.spotify.com/v1/search?q=rock+pop&type=track&limit=50&offset=${randomOffset * 10}`
      : `https://api.spotify.com/v1/search?q=${bubbleTags.join('+')}&type=track&limit=50&offset=${randomOffset * 10}`;

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
      if (result.tracks && Array.isArray(result.tracks.items)) {
        const newSelectedMusic: SelectedMusic[] = result.tracks.items.map((item: any) => ({
          id: item.id,
          popularity: item.popularity,
          url: item.external_urls.spotify,
          name: item.name,
          artist: item.artists[0]?.name,
          image: item.album?.images[0]?.url,
          artistImage: "",
          genre: "Unknown",
          followers: 0,
          albums: [],
        }));

        setData(newSelectedMusic);
      } else {
        throw new Error("Invalid data format from API");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FetchDataContext value={{ data, loading, error, fetchMusicData }}>
      {children}
    </FetchDataContext>
  );
};

export const useFetchDataContext = () => {
  const context = useContext(FetchDataContext);
  if (!context) {
    throw new Error("useFetchDataContext must be used within a FetchDataProvider");
  }
  return context;
};
