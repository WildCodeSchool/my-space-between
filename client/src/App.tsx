import "./App.css";
import BubbleTags from "./components/BubbleTags";
import { MusicProvider } from "./context/MusicContext";

function App() {
  return (
    <>
    <MusicProvider>
      <BubbleTags/>
      </MusicProvider>
    </>
  );
}

export default App;
