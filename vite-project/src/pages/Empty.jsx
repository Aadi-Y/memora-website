import "./Empty.css"
import startNotesImage from '../assets/NotesStart.jpg';
function Empty(){
    return(<>
        <div className="main-container">
            <div className="image-container">
                <img src={startNotesImage} alt="NotesStart" />
            </div>
            <div className="description-container">
                <h2>Start taking notes on today by clicking add,</h2> 
                <h2>capture and mark every important things forever</h2>
            </div>
        </div>
    </>);
}

export default Empty;