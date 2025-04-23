import "./App.css";
import Home from "./pages/Home";
import { MusicProvider } from "./context/MusicContext";
import Layout from "./components/Layout";

function App() {
  return (
    <MusicProvider>
      <Layout>
        <Home />
      </Layout>
    </MusicProvider>
  );
}

export default App;