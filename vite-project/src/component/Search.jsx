import './Search.css';
import React from 'react';
import { IoClose } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { useState } from 'react';

function Search({ handleSearch, handleClearSearchValue }) {
    const [searchValue, setSearchValue] = useState("");

    function handleValueChange(event) {
        setSearchValue(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' && searchValue) {
            handleSearch(searchValue);
        }
    }

    function handleSearching() {
        if (searchValue) {
            handleSearch(searchValue);
        }
    }

    function clearSearch() {
        setSearchValue("");
        handleClearSearchValue();
    }

    return (
        <div className="search-bar">
            <IoMdSearch className="search-bar__icon" onClick={handleSearching} />
            <input
                type="text"
                className="search-bar__input"
                placeholder="Search notes..."
                value={searchValue}
                onChange={handleValueChange}
                onKeyDown={handleKeyDown}
            />
            {searchValue.length >= 1 && (
                <IoClose className="search-bar__clear" onClick={clearSearch} />
            )}
        </div>
    );
}

export default Search;