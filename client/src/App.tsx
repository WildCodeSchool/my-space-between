import "./App.css";
import BurgerMenu from "./components/BurgerMenu";
import Home from "./pages/Home";
import { MusicProvider } from "./context/MusicContext";

function App() {
  return (
    <>
      <MusicProvider>
        <BurgerMenu />
        <Home />
      </MusicProvider>
    </>
  );
}

export default App;