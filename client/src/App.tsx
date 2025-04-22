import "./App.css";
import Home from "./pages/Home";
import { MusicProvider } from "./context/MusicContext";



function App() {
  return (
    <>
      <MusicProvider>
        <Home />
      </MusicProvider>
    </>
  );
}

export default App;

