import "./Home.css";
import Navbar from "../component/Navbar";
import Notecard from "../component/Notecard";
import { FaPlus } from "react-icons/fa6";
import EditAddNotes from "../component/EditAddNotes";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from 'react-hot-toast';
import Search from "../component/Search";
import Empty from "./Empty";
import NoSearch from "./NoSearch";
import NotesDetail from "../component/NotesDetail";
import Pagination from "../component/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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
      toast.error(response.data.message)
    }
  }

  // Pin/Unpin note
  async function handlePinNote(noteDetails){
    try {
      const noteId = noteDetails._id;
      const response = await axiosInstance.put("/edit-pinned/" + noteId, {
        isPinned: !noteDetails.isPinned
      });
      if(response.data && response.data.note){
        getAllNotes();
        toast.success(
          noteDetails.isPinned ? "Note unpinned" : "Note pinned"
        );
      }
    } catch(err) {
      console.error("Error toggling pin:", err);
    }
  }
  
  async function handleSearchValue(query){
    try{
      setSearchQuery(query);
      setCurrentPage(1);
      const response = await axiosInstance.get("/search-notes",{
        params:{query, page: 1, limit: 6}
      })

      if(response?.data.matchingNotes?.length <= 0){
        setAllNotes([]);
        setTotalPages(1);
      }

      if(response.data){
        setAllNotes(response.data.matchingNotes);
        setTotalPages(response.data.totalPages || 1);
        setIsSearch(true);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  function handleClearSearchValue(){
    setIsSearch(false);
    setSearchQuery("");
    setCurrentPage(1);
    getAllNotes(1);
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
      width: "90vw",
      maxWidth: "28rem",
      maxHeight: "85vh",
      height: "fit-content",
      overflowY: "auto",
      overflowX: "hidden",
      padding: "1.5rem",
      margin: "auto",
      borderRadius: "18px",
      border: "none",
      boxShadow: "0 16px 48px rgba(0, 0, 0, 0.14), 0 4px 16px rgba(0, 0, 0, 0.06)",
      backgroundColor: "#ffffff",
      scrollbarWidth: "thin",
      scrollbarColor: "#c8e6c9 transparent",
      inset: "0",
    },
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.35)",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
    },
  };
  
  

  // Fetch all notes
  async function getAllNotes(page = currentPage) {
    try {
      const response = await axiosInstance.get("/get-all-notes", {
        params: { page, limit: 6 }
      });
      setAllNotes(response.data.notes);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || page);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // Handle page change
  async function handlePageChange(page) {
    setCurrentPage(page);
    if (isSearch && searchQuery) {
      try {
        const response = await axiosInstance.get("/search-notes", {
          params: { query: searchQuery, page, limit: 6 }
        });
        if (response.data) {
          setAllNotes(response.data.matchingNotes);
          setTotalPages(response.data.totalPages || 1);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      getAllNotes(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                  drawing={item.drawing}
                  onEdit={() => {handleEdit(item)}}
                  onDelete={() => {handleDelete(item)}}
                  onPinNote={() => {handlePinNote(item)}}
                  onView={()=>{handleView(item)}}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
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
            onRequestClose={() => setOpenEditAddNotes({ isShown: false, type: "add", data: null })}
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
    </>
  );
}

export default Home;
