import { createContext, ReactNode, useContext } from 'react';
import { Tags } from '../data/Tags';

type MusicContextType = {
    tags: string[];
    bubbleTags: string[];
    setBubbleTags: React.Dispatch<React.SetStateAction<string[]>>
};

export const MusicContext = createContext<MusicContextType>({
    tags: [],
    bubbleTags: [],
    setBubbleTags: () => {}
});

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <MusicContext value={{ tags: Tags, bubbleTags: [], setBubbleTags: () => {} }}>
            {children}
        </MusicContext>
    );
};

export const useMusicContext = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusicContext must be used within a MusicProvider');
    }
    return context;
};