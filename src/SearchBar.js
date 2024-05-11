// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInput(newValue);
        onSearch(newValue);  // Update the search query in real-time as user types
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                value={input}
                onChange={handleChange}
                placeholder="Search books..."
            />
        </div>
    );
}

export default SearchBar;
