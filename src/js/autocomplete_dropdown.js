import React, { useState, useEffect } from 'react';

function AutoCompleteDropdown({ cell, onChange }) {
    const [selected, setSelected] = useState(cell.content);

    useEffect(() => {
        setSelected(cell.content);
    }, [cell.content]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        onChange({ content: value });
    };

    return (
        <div className="autocomplete-wrapper">
            <select
                value={selected}
                onChange={handleChange}
                className="options-list"
            >
                {cell.suggested &&
                    cell.suggested.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default AutoCompleteDropdown;
