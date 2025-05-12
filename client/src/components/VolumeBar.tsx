import { useState, useEffect, ChangeEvent } from "react";

interface SpotifyPlayer {
  setVolume: (volume: number) => Promise<void>;
}

interface VolumeControlProps {
  player: SpotifyPlayer | null;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ player }) => {
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (player) {
      player.setVolume(volume).catch((err) =>
        console.error("Erreur lors du changement de volume :", err)
      );
    }
  }, [volume, player]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="p-4">
      <label htmlFor="volume" className="block text-sm font-medium mb-1">
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
        className="w-full"
      />
    </div>
  );
};

export default VolumeControl;
