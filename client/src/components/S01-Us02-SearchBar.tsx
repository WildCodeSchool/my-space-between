import React, { useState } from 'react';
import { Tags } from '../data/Tags';
import { useMusicContext } from '../context/MusicContext';



const SearchBar = ({tags}) => {
    const [searchStyle, setSearchStyle] = useState("")

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchStyle(event.target.value)
    }

    const filteredTags = Tags.filter(tag => 
    tag.toLowerCase().startsWith(searchStyle.toLowerCase()) &&
    searchStyle.trim() !== ""
)
    .slice(0, 5)

return (
    <div>
        <input type ="text"
                placeholder ="Search any genre, mood,..."
                value = {searchStyle}
                onChange = {handleChange}/>

            {filteredTags.length > 0 && (
                <ul>
                    {filteredTags.map((tag, index) => (
                        <li key = {index}>{tag}</li>
                    ))}
                </ul>
            )}
    </div>
)
}





export default SearchBar