import React, { useState } from 'react';
import { Tags } from '../data/Tags';
//import { useMusicContext } from '../context/MusicContext';

const SearchBar = ({ tags = Tags }) => {
    const [searchStyle, setSearchStyle] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [selectedResult, setSelectedResult] = useState<string | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchStyle(value);

        if (value.trim() === "") {
            setResults([]);
            return;
        }

        const filteredResults = tags.filter(tag =>
            tag.toLowerCase().startsWith(value.toLowerCase())
        );

        setResults(filteredResults);
    };

    const handleSelect = (result: string) => {
        setSelectedResult(result);
        setSearchStyle(result);
        setResults([]);
    };

    return (
        <div>
            <input
                type="text"
                value={searchStyle}
                onChange={handleSearch}
                placeholder="Search any genre, mood..."
            />
            {results.length > 0 && (
                <ul>
                    {results.map((result, index) => (
                        <li key={index} onClick={() => handleSelect(result)}>
                            {result}
                        </li>
                    ))}
                </ul>
            )}
            {selectedResult && (
                <div>{selectedResult}</div>
            )}
        </div>
    );
};

export default SearchBar;
