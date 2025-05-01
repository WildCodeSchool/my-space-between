import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Contact } from "./pages/Contact";
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

  {path: "/contact",
    element: <Contact />,
  },
  {
  path: "/", 
    element: <Home />,
  },
  { path: "/player", 
        element: <Player /> },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/callback",
    element: <Home />,
  },
 ],
  },
  ]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Your HTML document should contain a <div id="root"></div>');
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
