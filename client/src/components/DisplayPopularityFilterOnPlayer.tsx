import styles from "./DisplayPopularityFilterOnPlayer.module.css";
import { PopularityLevelsContext } from "../context/PopularityLevelsContext";
import { useContext } from "react";

function DisplayPopularityFilterOnPlayer() {
  const context = useContext(PopularityLevelsContext);

  if (!context) {
    throw new Error("PopularityLevelsContext must be used within a provider");
  }

  const { popularityFilter } = context;

  const displayFilter =
    String(popularityFilter) === "0" ? "Any" : popularityFilter;

  return (
    <div className={styles.popularityFilterContainer}>
      <p>Popularity : {displayFilter}</p>
    </div>
  );
}

export default DisplayPopularityFilterOnPlayer;
