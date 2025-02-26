import { useEffect, useState } from 'react';
import './Notecard.css';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { VscPinned } from "react-icons/vsc";
import moment from "moment";

function Notecard({title,date,content,tags,onEdit,onDelete,isPinnedNote,onView}){
    const [isPinnedNote1,setIsPinnedNote] = useState(true);
    const [shortContent,setShortContent] = useState("");

    const togglePin = () =>{
        setIsPinnedNote((prev)=>!prev);
    }

    function handleContent(){
        setShortContent(content.split(" ").slice(0,8).join(" ")); 
    }
    
    useEffect(()=>{
        handleContent();
    },[])
    
    return(
        <>
        <div className="notecard">
            <div className="notecard-container" >
                    <div className='note-header'>
                        <div>
                            <h2 className='note-title'>{title}</h2>
                            <h4 className='note-date'>{moment(date).format("Do MM YYYY")}</h4>
                        </div>
                        <div className="note-pin">
                            <VscPinned className='note-pin-btn'
                            style={{color: isPinnedNote ? "blue" : "black"}}
                             onClick={togglePin}
                            />
                        </div>
                    </div>
                    <div className='note-body' onClick={onView}>
                        <p className='note-content'>{shortContent}</p>
                    </div>
                    <div className='note-footer'>
                        <div className='note-tag'>{tags.map((tag,index)=>`#${tag} `)}</div>
                        <div className="control-btn">
                            <MdEdit onClick={onEdit}className='note-edit-btn
                            '/>
                            <MdDelete onClick={onDelete} className='note-delete-btn'/>
                        </div>
                    </div>
                </div>
        </div>
            
        </>
    );
}

export default Notecard;