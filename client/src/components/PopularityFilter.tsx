import styles from "./PopularityFilter.module.css";
import { useState } from "react";
import { PopularityLevels } from "../context/PopularityLevelsContext";

interface PopularityFilterProps {
  selected: PopularityLevels;
  onChange: (value: PopularityLevels) => void;
}

const PopularityFilter: React.FC<PopularityFilterProps> = ({
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        className={`${isOpen ? styles.open : ""} ${styles.popularityButton}`}
      >
        <div>
          <h2>Popularity</h2>
        </div>
        <div className={styles.levelButtons}>
          <button
            className={`  ${
              selected === "Unknown" ? styles.selected : styles.unselected
            }`}
            onClick={() => onChange("Unknown")}
          >
            Unknown
          </button>
          <button
            className={`  ${
              selected === "Low" ? styles.selected : styles.unselected
            }`}
            onClick={() => onChange("Low")}
          >
            Low
          </button>
          <button
            className={`  ${
              selected === "Medium" ? styles.selected : styles.unselected
            }`}
            onClick={() => onChange("Medium")}
          >
            Medium
          </button>
          <button
            className={`  ${
              selected === "Any" ? styles.selected : styles.unselected
            }`}
            onClick={() => onChange("Any")}
          >
            Any
          </button>
        </div>
      </div>
      <img
        src="/src/assets/images/slider.png"
        onClick={toggleFilter}
        className={`${styles.filterButton} `}
      />
    </div>
  );
};

export default PopularityFilter;
