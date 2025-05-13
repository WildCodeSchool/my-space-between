import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import { About } from "./pages/About";
import { FetchDataProvider } from "./context/FetchDataContext";
import { MusicProvider } from "./context/MusicContext";
import { PopularityFilterProvider } from "./context/PopularityLevelsContext";
import Home from "./pages/Home";
import Player from "./pages/Player";
import IframePlayer from "./pages/IframePlayer";
import { EasterEgg } from "./pages/Easteregg";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/player",
        element: <Player />,
      },
      {
        path: "/iframe-player",
        element: <IframePlayer />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/callback",
        element: <Home />,
      },
      {
        path: "/easteregg",
        element: <EasterEgg />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Your HTML document should contain a <div id="root"></div>');
}

createRoot(rootElement).render(
  <FetchDataProvider>
    <MusicProvider>
      <PopularityFilterProvider>
        <RouterProvider router={router} />
      </PopularityFilterProvider>
    </MusicProvider>
  </FetchDataProvider>
);
