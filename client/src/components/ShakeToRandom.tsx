import { forwardRef, useImperativeHandle } from "react";
import { useMusicDataContext } from "../context/MusicContext";
import { useShake } from "../hooks/useShake";
import { useCallback } from "react";

const ShakeToRandom = forwardRef((_, ref) => {
  const { tags, setBubbleTags } = useMusicDataContext();

  const handleShake = useCallback(() => {
    const newBubbleTags: string[] = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * tags.length);
      if (newBubbleTags.includes(tags[randomIndex])) {
        i--;
        continue;
      }
      newBubbleTags.push(tags[randomIndex]);
    }
    setBubbleTags(newBubbleTags);
  }, [tags, setBubbleTags]);

  useImperativeHandle(ref, () => ({
    triggerShake: () => {
      console.log("triggerShake called!");
      handleShake();
    },
  }));

  useShake({
    threshold: 15,
    timeout: 1000,
    onShake: handleShake,
  });

  return <div></div>;
});

export default ShakeToRandom;
