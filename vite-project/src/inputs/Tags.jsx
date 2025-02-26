import "./Tags.css";
import {MdAdd} from 'react-icons/md';
import {MdClose} from 'react-icons/md';
import {useState} from "react";
function Tags({tags,setTags}){
    const [inputValue,setInputValue] = useState("");

    function handleInputChange(event){
        setInputValue(event.target.value);
    }
    function addTags(){
        if(inputValue.trim() !== ""){
            setTags([...tags,inputValue.trim()]);
            setInputValue("");
        }
    }

    function handleKeyDown (event) {
        if(event.key === "Enter"){
            addTags();
        }
    }

    function removeTags(tag){
        setTags(tags.filter((t)=> t !== tag
        ))
    }
    
    return( <>
                <div className="tags-container">
                    <div className="tags-display-container">
                     {tags.map((tags,index)=>{
                        return (
                        <span 
                        key={index} className="single-tag">
                            #{tags} 
                        <button className="tag-close-btn">
                            <MdClose className="btn-close"
                            onClick={() => removeTags(tags)}
                            />
                        </button>
                        </span>

                        )

                     })}
                    </div>
                    <div className="input-and-addBtn">
                        <input 
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="tag-input"
                        />
                        <button className="tag-add-btn" onClick={addTags}><MdAdd className="tag-add" 
                        /></button>
                        </div>
                    
                </div>
            </>)
}
export default Tags;