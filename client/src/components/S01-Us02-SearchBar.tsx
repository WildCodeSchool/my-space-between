import React, { useState } from 'react';

const SearchBar = ({tags}) => {
    const [searchStyle, setSearchStyle] = useState("")

    const handleChange = (event) => {
        setSearchStyle(event.target.value)
    }
}
const filteredTags = tags.filter(tag => 
    tag.toLowerCase().includes(searchStyle.toLowerCase())
)






export default SearchBar