import React, { useEffect } from 'react';
import Modal from 'react-modal';
import "./NotesDetail.css"
import {useState} from "react";
import moment from "moment";
function NotesDetail({item}) {
    const [date,setDate] = useState("");
   
    
  function handleDate(){
    setDate(item.createdOn);
  }

  

  useEffect(()=>{
    handleDate();
  },[])


  return (
    <>
        <div className="notesDetail-container">
                <div className='notes-header'>
                    <div className="title-container">
                        <h2 className="notes-title">Title</h2>
                        <p className='title-content'>{item?.title}</p>
                    </div>
                    <div className="date-container">
                        <h2>Date</h2>
                        <p>{moment(date).format("Do MM YYYY")}</p>
                    </div>
                </div>
                <div className="notes-main">
                    <h2 className='notes-content-title'>Content</h2>
                    <p className='notes-content'>{item?.content}</p>
                </div>
                <div className="">
                    <h2 className='tags'>Tags</h2>
                    {
                        item?.tags && item.tags.length > 0 ? (item?.tags).map((singleItem,index)=>(
                            <span key={index}>#{singleItem} </span>
                        ))
                        : (
                        <p>No tags</p>
                          )
                    }
                </div>
        </div>
    </>
  )
}

export default NotesDetail;