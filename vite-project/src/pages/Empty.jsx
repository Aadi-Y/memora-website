import "./Empty.css";
import startNotesImage from '../assets/NotesStart.jpg';
import { FiPlus } from "react-icons/fi";

function Empty() {
    return (
        <div className="empty-state">
            <img src={startNotesImage} alt="Start taking notes" className="empty-state__img" />
            <h2 className="empty-state__title">Your notebook is empty</h2>
            <p className="empty-state__text">
                Tap the <FiPlus className="empty-state__icon" /> button to capture your first thought.
            </p>
        </div>
    );
}

export default Empty;