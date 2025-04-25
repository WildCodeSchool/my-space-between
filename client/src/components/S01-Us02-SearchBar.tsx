import React, { useState } from "react";
import styles from "./S01-Us02-SearchBar.module.css";
import { useMusicContext } from "../context/MusicContext";

const SearchBar = () => {
  const { tags, bubbleTags, setBubbleTags } = useMusicContext();
  const [searchStyle, setSearchStyle] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [cloudTags] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchStyle(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filteredResults = tags.filter(
      (tag) =>
        tag.toLowerCase().startsWith(value.toLowerCase()) &&
        !bubbleTags.includes(tag) &&
        !cloudTags.includes(tag)
    );

    setResults(filteredResults);
  };

  const handleSelect = (result: string) => {
    setSearchStyle("");
    setResults([]);
    setBubbleTags((prevTags) => [...prevTags, result]);
  };

  return (
    <div className={styles.mainSearchMenu}>
      <input
        className={styles.researchBar}
        type="text"
        value={searchStyle}
        onChange={handleSearch}
        placeholder="Search any genre, mood..."
      />
      {results.length > 0 && (
        <section className={styles.listContainer}>
          <ul className={styles.resultList}>
            {results.slice(0, 10).map((result, index) => (
              <li key={index} onClick={() => handleSelect(result)}>
                {result}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default SearchBar;
