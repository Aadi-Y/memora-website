import './Search.css';
import React from 'react';
import { IoClose } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import {useState} from 'react';
import axiosInstance from "../utils/axiosInstance";


function Search({handleSearch,handleClearSearchValue}){
    const [searchValue,setSearchValue] = useState("");
    
    function handleValueChange(event){
        setSearchValue(event.target.value);
    }
    

    async function handleSearching(){
        if(searchValue){
            handleSearch(searchValue);
        }
    }

    function clearSearch(){
        setSearchValue("");
        handleClearSearchValue();

    }

    let searchLength = searchValue.length;
    return( <> 
                <div className="search-container">
                    <div>
                        <input 
                        type="text"
                        placeholder='Search here'
                        value={searchValue}
                        onChange={handleValueChange}
                        />
                    </div>
                    <div className="search-controls">
                    {
                        searchLength >= 1 && <IoClose className='close-btn' onClick={clearSearch}/>
                    }
                    
                    <IoMdSearch className='search-btn' onClick={handleSearching}/>
                   
                    </div>
                    
                </div>
            </>);
}

export default Search;