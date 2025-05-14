import { useState, useEffect, ChangeEvent } from "react";
import styles from "./VolumeBar.module.css";

interface SpotifyPlayer {
  setVolume: (volume: number) => Promise<void>;
}

interface VolumeControlProps {
  player: SpotifyPlayer | null;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ player }) => {
  const [volume, setVolume] = useState<number>(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });

  useEffect(() => {
    if (player) {
      player.setVolume(volume).catch((err) =>
        console.error("Erreur lors du changement de volume :", err)
      );
    }
    localStorage.setItem("volume", volume.toString());
  }, [volume, player]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="volume" className={styles.label}>
        Volume : {Math.round(volume * 100)}%
      </label>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
        className={styles.slider}
        style={{ "--volume-fill": `${volume * 100}%` } as React.CSSProperties}
      />
    </div>
  );
};

export default VolumeControl;
