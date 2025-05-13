import "./App.css";
import { Outlet, useLocation } from "react-router";
import BurgerMenu from "./components/BurgerMenu";
import LoginButton from "./components/LoginButton";
import { useEffect, useState } from "react";
import { useFetchDataContext } from "./context/FetchDataContext";
import { Header } from "./components/Header";
import Tutorial from "./components/Tutorial";

function App() {
  const { musicList } = useFetchDataContext();
  const location = useLocation();

  interface MusicItem {
    id: string;
    name: string;
    artist: string;
    url: string;
    image: string;
  }

  type DominantColorCallback = (color: string) => void;

  const [dominantColors, setDominantColors] = useState<Map<string, string>>(
    new Map()
  );

  function getDominantColor(
    image: HTMLImageElement,
    callback: DominantColorCallback
  ): void {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to get canvas context");
    }

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r = 0,
      g = 0,
      b = 0;
    const pixelCount = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    callback(`rgb(${r},${g},${b})`);
    console.log(`Dominant color: rgb(${r},${g},${b})`);
  }

  function darkenColor(color: string, amount: number): string {
    const match = color.match(/\d+/g);
    if (!match) return color;

    const [r, g, b] = match.map(Number);
    const darken = (value: number) => Math.max(0, value - amount);

    return `rgb(${darken(r)},${darken(g)},${darken(b)})`;
  }

  useEffect(() => {
    setDominantColors(new Map());
    musicList.forEach((item: MusicItem) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = item.image;

      img.onload = () => {
        getDominantColor(img, (dominantColor: string) => {
          setDominantColors((prevColors: Map<string, string>) =>
            new Map(prevColors).set(item.id, dominantColor)
          );
        });
      };
    });
  }, [musicList]);

  useEffect(() => {
    if (dominantColors.size > 0) {
      const lastColor = Array.from(dominantColors.values()).pop();
      if (lastColor) {
        const darkerColor = darkenColor(lastColor, 50);
        document.body.style.background = `radial-gradient(circle, ${lastColor} 0%, ${darkerColor} 100%)`;
      }
    }
  }, [dominantColors]);

  useEffect(() => {
    if (location.pathname === "/home" || "/") {
      document.body.style.background = `radial-gradient(circle, rgba(92, 57, 196, 1) 0%, rgba(28, 7, 89, 1) 100%)`;
    }
  }, [location.pathname]);

  const [showTutorial, setShowTutorial] = useState(false);
  useEffect(() => {
    const tutorialShown = localStorage.getItem("tutorialShown");
    if (!tutorialShown) {
      setShowTutorial(true);
      localStorage.setItem("tutorialShown", "true");
    }
  }, []);

  return (
    <>
      <Header />
      {showTutorial && (
        <Tutorial
          onClose={() => {
            setShowTutorial(false);
          }}
        />
      )}
      <BurgerMenu />
      <LoginButton />
      <Outlet />
    </>
  );
}

export default App;
