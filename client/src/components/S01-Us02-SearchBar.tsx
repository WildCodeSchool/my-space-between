import React, { useState } from "react";

import styles from "../components/S01-Us02-SearchBar.module.css";
import { useMusicContext } from "../context/MusicContext";

const SearchBar = () => {
  const { tags, bubbleTags, setBubbleTags } = useMusicContext();
  const [searchStyle, setSearchStyle] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [, setSelectedResult] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchStyle(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filteredResults = tags.filter((tag) =>
      tag.toLowerCase().startsWith(value.toLowerCase())
    );

    setResults(filteredResults);
  };

  const handleSelect = (result: string) => {
    console.log("before set : ", bubbleTags);
    setSelectedResult(result);
    setSearchStyle("");
    setResults([]);
    setBubbleTags((prevTags) => [...prevTags, result]);
    console.log("After set : ", bubbleTags);
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
