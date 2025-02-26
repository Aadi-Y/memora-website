import Tags from '../inputs/Tags';
import axiosInstance from '../utils/axiosInstance';
import './EditAddNotes.css';
import { useState } from 'react';
import {toast , ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function EditAddNotes({noteData,type,getAllNotes,onClose}){
    const [title,setTitle] = useState(noteData?.title || "");
    const [content,setContent] = useState(noteData?.content || "");
    const [tags,setTags] = useState(noteData?.tags || []);
    const [error,setError] = useState("");
    
    async function addNotes(){
        if(!title){
            setError("Please enter the title");
            return;
        }
        if(!content){
            setError("Please enter the content");
            return;
        }

        setError("");

        try{
            const response = await axiosInstance.post("/add-notes",{
                title,
                content,
                tags
            });

            if(response.data && response.data.note){
                getAllNotes();
                onClose();
                alert("Notes Added successfully")
                toast.success("Notes added Successfully",{
                    autoClose:3000
                })

            }

        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }
        }
        getAllNotes();
        
    }  
    function handleTitleChange(event){
        setTitle(event.target.value);
    }

    function handleContentChange(event){
        setContent(event.target.value);
    }
    async function editNotes(){
        try{
            const noteId = noteData._id;
            const response = await axiosInstance.put("/edit-note/" + noteId,{
                title,
                content,
                tags
            });

            if(response.data && response.data.note){
                getAllNotes();
                onClose();
                toast.info("Notes updated Successfully",{autoClose:3000});


            }
        }
        catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }
        }
    }

    async function deleteNotes(){
        const response = await axiosInstance.delete("/delete-note/" + noteId);
        toast.error("Notes deleted Successfully",{autoClose:3000});
    }
    
    return( <>
                <div className="editAddNotes-container">
                    <div className="editAddNotes-form">
                        <div className="input-title">
                            <label >TITLE</label>
                            <input 
                            type="text"
                            placeholder='Go to Walk' 
                            className='title-input'
                            value={title}
                            onChange={handleTitleChange}
                            />
                        </div>
                        <div className="input-content">
                            <label >CONTENT</label>
                            <textarea 
                            className='input-textarea'
                            value={content}
                            onChange={handleContentChange}
                            ></textarea>
                        </div>
                        <div className="input-tags">
                            <label>TAGS</label>
                            <div className="tag-component">
                                <Tags tags={tags} setTags={setTags}/>
                            </div>
                        </div>
                        <div className="error-message-display">
                            <p>{error}</p>
                        </div>

                        {type === "edit" ? <button className='add-btn1'
                        onClick={editNotes}>UPDATE</button> : <button 
                        className='add-btn1'
                        onClick={addNotes}
                        >ADD</button>}

                        {/* <button 
                        className='add-btn1'
                        onClick={addNotes}
                        >ADD</button>
                        <button className='add-btn1'
                        onClick={editNotes}>UPDATE</button> */}
                    </div>
                </div>
                <ToastContainer/>
            </>)
}
export default EditAddNotes;