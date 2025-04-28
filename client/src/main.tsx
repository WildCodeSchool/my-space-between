import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import { About } from "./pages/About";
import { FetchDataProvider } from "./context/FetchDataContext";
import { MusicProvider } from "./context/MusicContext";
import Home from "./pages/Home"; 
import Player from "./pages/Player"; 


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/", // The root path
        element: <Home />,
      }, // Renders the App component for the home page
      { path: "/player", element: <Player /> },
      {
    path: "/about",
    element: <About />,
  },
    ],
  },
  // Renders the App component for the home page
  // Try adding a new route! For example, "/about" with an About component
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Your HTML document should contain a <div id=\"root\"></div>");
}

createRoot(rootElement).render(
  <StrictMode>
    <FetchDataProvider>
      <MusicProvider>
        <RouterProvider router={router} />
      </MusicProvider>
    </FetchDataProvider>
  </StrictMode>
);
