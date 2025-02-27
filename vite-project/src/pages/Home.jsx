import "./Home.css";
import Navbar from "../component/Navbar";
import Notecard from "../component/Notecard";
import { FaPlus } from "react-icons/fa6";
import { IoClose, IoShareSocialOutline } from "react-icons/io5";
import EditAddNotes from "../component/EditAddNotes";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "../component/Search";
import Empty from "./Empty";
import NoSearch from "./NoSearch";
import NotesDetail from "../component/NotesDetail";

function Home() {
  const [openEditAddNotes, setOpenEditAddNotes] = useState({
    isShown:false,
    type:"add",
    data:null

});

  const[openDetail,setOpenDetail] = useState({
    isShown:false,
    type:"view",
    data:null
  })

  const [allNotes, setAllNotes] = useState([]);
  const [isSearch,setIsSearch] = useState(false);
  const [email, setEmail] = useState("");
  const [search,setSearch] = useState([]);

  //Update Note
  async function handleEdit(noteDetails){
    setOpenEditAddNotes({
      isShown:true,
      data:noteDetails,
      type:"edit"
    });
  }
  
  //Delete note
  async function handleDelete(noteDetails){
    const noteId = noteDetails._id;
    const response = await axiosInstance.delete("/delete-note/" + noteId);
    getAllNotes();
    if(response.data && response.data.message){
      alert(response.data.message);
      // console.log("deleted")
      toast.error(response.data.message,{
        autoClose:3000,
      })
    }
  }
  
  async function handleSearchValue(query){
    try{
      const response = await axiosInstance.get("/search-notes",{
        params:{query}
      })

      if(response?.data.length <= 0){
        <NoSearch/>
      }

      if(response.data){
        setAllNotes(response.data.matchingNotes);
        setIsSearch(true);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  function handleClearSearchValue(){
    setIsSearch(false);
    getAllNotes();
  }
  

  // const componentStyle = {
  //   content: {
  //     width: "36rem",
  //     height: "36rem",
  //     overflowY: "auto",
  //     padding: "1rem",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     flexDirection: "column",
  //     margin: "auto", 
  //     borderRadius: "10px",
  //     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  //     backgroundColor: "#ffffff",
  //   },
  //   overlay: {
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "rgba(0, 0, 0, 0.4)", 
  //     zIndex: 1000, 
  //   },
  // };

  const componentStyleDetails = {
    content: {
      width: "80vw",
      maxWidth: "30rem",
      height: "80vh",
      maxHeight: "36rem",
      overflowY: "auto",
      padding: "1rem",
      margin: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
      scrollbarWidth: "thin", // For Firefox
      scrollbarColor: "#888 #f1f1f1", // For Firefox
    },
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 1000,
    },
  };
  
  

  // Fetch all notes
  async function getAllNotes() {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      setAllNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
}

  // Fetch user details
  async function getUser() {
    try {
      const response = await axiosInstance.get("/get-user");
      setEmail(response.data.users[0]?.email || ""); // Handle cases where email might be undefined
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  function handleView(item){
    setOpenDetail({
      isShown:true,
      data:item,
      type:''
    })
  }

  useEffect(() => {
    getAllNotes();
    getUser();
  }, []);

  return (
    <>
      <div className="home-container">
        <Navbar search = {Search} handleSearch = {handleSearchValue} handleClearSearchValue = {handleClearSearchValue}/>
        
        {
          allNotes?.length > 0 ? (<div className="notes-section">
            <div className="single-note">
              {allNotes.map((item) => (
                <Notecard
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => {handleEdit(item)}}
                  onDelete={() => {handleDelete(item)}}
                  onPinNote={() => {}}
                  onView={()=>{handleView(item)}}
                />
              ))}
            </div>
          </div>) : isSearch ? 
          (<NoSearch/>) : 
          (<Empty/>)
        }

        {/* <div className="notes-section">
          <div className="single-note">
            {allNotes.map((item) => (
              <Notecard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => {handleEdit(item)}}
                onDelete={() => {handleDelete(item)}}
                onPinNote={() => {}}
              />
            ))}
          </div>
        </div> */}

        <div className="note-add-btn">
          <FaPlus className="add-btn" onClick={() => {
            setOpenEditAddNotes({isShown:true,type:"add",data:null})
          }} />
        </div>

        <div className="modal-container">
          <Modal
            isOpen={openEditAddNotes.isShown}
            style={componentStyleDetails}
            onRequestClose={() => setOpenEditAddNotes(false)}
            // className="custom-modal-content"
          >
            <EditAddNotes 
            type={openEditAddNotes.type}
            noteData = {openEditAddNotes.data}
            onClose = {()=>{
                setOpenEditAddNotes({
                  isShown:false,
                  type:"add",
                  data:null
                })
            }}
            getAllNotes = {getAllNotes}
            />
            <IoClose
              className="close-btn-addEdit"
              onClick={() => {setOpenEditAddNotes({
                isShown:false,
                type:"add",
                data:null
              })

              }}
            />
          </Modal>
        </div>
        <div className="modal-container1">
          <Modal 
          isOpen={openDetail.isShown}
          style={componentStyleDetails}
          >
            <NotesDetail item={openDetail.data}
            
            />
            <button onClick={()=>{
              setOpenDetail({
                isShown:false,
                data:null,
                type:""
              })
            }}
            className="detail-close-btn"
            >Close</button>
          </Modal>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Home;
