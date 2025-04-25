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
}

const FetchDataContext = createContext<FetchDataContextType | undefined>(
  undefined
);

export const FetchDataProvider = ({ children }: { children: ReactNode }) => {
  const [musicList, setMusicList] = useState<SelectedMusicModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <FetchDataContext
      value={{ musicList, setMusicList, loading, setLoading, error, setError }}
    >
      {children}
    </FetchDataContext>
  );
};

export const useFetchDataContext = () => {
  const context = useContext(FetchDataContext);
  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};
