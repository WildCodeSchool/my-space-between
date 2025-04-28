import { createContext, ReactNode, useContext, useState } from "react";
import { Tags } from "../data/Tags";

type MusicContextType = {
  tags: string[];
  bubbleTags: string[];
  setBubbleTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export const MusicContext = createContext<MusicContextType>({
  tags: [],
  bubbleTags: [],
  setBubbleTags: () => {},
});

export const MusicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bubbleTags, setBubbleTags] = useState<string[]>([]);
  return (
    <MusicContext
      value={{
        tags: Tags,
        bubbleTags: bubbleTags,
        setBubbleTags: setBubbleTags,
      }}
    >
      {children}
    </MusicContext>
  );
};

export const useMusicDataContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicDataContext must be used within a MusicProvider");
  }
  return context;
};
