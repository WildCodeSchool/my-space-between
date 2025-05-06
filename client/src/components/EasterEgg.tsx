import { useEffect } from "react";
import { useMusicDataContext } from "../context/MusicContext";
import { useNavigate } from "react-router";

function EasterEgg() {
  const { bubbleTags, setBubbleTags } = useMusicDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      bubbleTags.includes("Wild") &&
      bubbleTags.includes("Code") &&
      bubbleTags.includes("School")
    ) {
      setBubbleTags([]);
      navigate("/easteregg");
    }
  }, [bubbleTags, navigate, setBubbleTags]);

  return <></>;
}

export default EasterEgg;
