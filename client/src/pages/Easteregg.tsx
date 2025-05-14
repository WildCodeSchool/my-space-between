import { useRef, useState } from "react";
import style from "./EasterEgg.module.css";

export const EasterEgg = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    setShowVideo(true);
    setTimeout(async () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 5;
        await videoRef.current.play();
        videoRef.current.requestFullscreen?.();
      }
    }, 100);
  };

  return (
    <>
      <div className={style.easterEggContainer}>
        {!showVideo && (
          <button onClick={handlePlay} className={style.easterEggButton}>
            <img src="/src/assets/images/wild.png" /> <br />
            Toutes les infos sur la Wild et ses étudiants, c'est par ici !
          </button>
        )}
        {showVideo && (
          <video
            className={style.easterEggVideo}
            ref={videoRef}
            controls
            width="640"
            height="360"
            style={{ maxWidth: "100%", height: "auto" }}
          >
            <source src="/src/assets/video/trololo.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéo.
          </video>
        )}
      </div>
    </>
  );
};
