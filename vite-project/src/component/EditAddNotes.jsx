import Tags from '../inputs/Tags';
import axiosInstance from '../utils/axiosInstance';
import './EditAddNotes.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { FiEdit3 } from 'react-icons/fi';
import DrawingCanvas from './DrawingCanvas';

function EditAddNotes({noteData, type, getAllNotes, onClose}){
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [drawing, setDrawing] = useState(noteData?.drawing || "");
    const [showCanvas, setShowCanvas] = useState(!!noteData?.drawing);
    const [error, setError] = useState("");
    
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
                title, content, tags, drawing
            });
            if(response.data && response.data.note){
                getAllNotes();
                onClose();
                toast.success("Note added successfully");
            }
        } catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }
        }
        getAllNotes();
    }

    async function editNotes(){
        try{
            const noteId = noteData._id;
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title, content, tags, drawing
            });
            if(response.data && response.data.note){
                getAllNotes();
                onClose();
                toast.success("Note updated successfully");
            }
        } catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }
        }
    }

    return (
        <div className="ean">
            <div className="ean__header">
                <h2 className="ean__heading">{type === "edit" ? "Edit Note" : "New Note"}</h2>
                <button className="ean__close" onClick={onClose} aria-label="Close">
                    <IoClose />
                </button>
            </div>

            <div className="ean__group">
                <label className="ean__label">Title</label>
                <input
                    type="text"
                    className="ean__input"
                    placeholder="e.g. Go for a walk"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="ean__group">
                <label className="ean__label">Content</label>
                <textarea
                    className="ean__textarea"
                    placeholder="Write your note here…"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="ean__group">
                <label className="ean__label">Tags</label>
                <Tags tags={tags} setTags={setTags} />
            </div>

            <div className="ean__group">
                {!showCanvas ? (
                    <button
                        type="button"
                        className="ean__canvas-toggle"
                        onClick={() => setShowCanvas(true)}
                    >
                        <FiEdit3 /> Add a diagram
                    </button>
                ) : (
                    <>
                        <div className="ean__canvas-header">
                            <label className="ean__label">Diagram</label>
                            <button
                                type="button"
                                className="ean__canvas-hide"
                                onClick={() => { setShowCanvas(false); setDrawing(""); }}
                            >
                                Remove diagram
                            </button>
                        </div>
                        <DrawingCanvas
                            initialData={drawing}
                            onChange={(data) => setDrawing(data)}
                        />
                    </>
                )}
            </div>

            {error && <p className="ean__error">{error}</p>}

            <button
                className="ean__submit"
                onClick={type === "edit" ? editNotes : addNotes}
            >
                {type === "edit" ? "Update Note" : "Add Note"}
            </button>

        </div>
    );
}

export default EditAddNotes;