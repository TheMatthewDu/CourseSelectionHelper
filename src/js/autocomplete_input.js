import React, { useState, useEffect } from 'react';


function AutoCompleteInput({ cell, onChange }) {
    const [inputValue, setInputValue] = useState(cell.content);
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        setSuggestions(cell.suggested);
    }, [cell.suggested]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onChange({ content: value });

        // Update the suggestion list based on the input.
        if (value.length > 0) {
            const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions(suggestions);
        }
        setShowSuggestions(true);
    };

    return (
        <div className="autocomplete-wrapper">
            <input
                type="text"
                value={cell.show ? cell.content : inputValue}
                onChange={handleChange}
                onFocus={() => {
                    setFilteredSuggestions(suggestions);
                    setShowSuggestions(true);
                }}
                onBlur={() => {
                    // Delay hiding suggestions to allow click events on the list.
                    setTimeout(() => setShowSuggestions(false), 100);
                }}
                className="grid-input"
                placeholder={cell.placeholder !== undefined ? cell.placeholder : "Search course..."}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onMouseDown={() => {
                                setInputValue(suggestion);
                                onChange({ content: suggestion });
                                setShowSuggestions(false);
                            }}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AutoCompleteInput;
