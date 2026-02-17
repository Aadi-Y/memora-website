import './Notecard.css';
import { MdEdit, MdDelete } from "react-icons/md";
import { VscPinned } from "react-icons/vsc";
import moment from "moment";
import ShapePreview from "./ShapePreview";

function Notecard({ title, date, content, tags, onEdit, onDelete, isPinned, onPinNote, onView, drawing }) {
    return (
        <div className={`nc ${isPinned ? 'nc--pinned' : ''}`}>
            <div className="nc__header">
                <div className="nc__meta">
                    <h3 className="nc__title">{title}</h3>
                    <span className="nc__date">{moment(date).format("MMM D, YYYY")}</span>
                </div>
                <button
                    className={`nc__pin ${isPinned ? 'nc__pin--active' : ''}`}
                    onClick={onPinNote}
                    title={isPinned ? "Unpin note" : "Pin note"}
                >
                    <VscPinned />
                </button>
            </div>

            <div className="nc__body" onClick={onView}>
                {drawing && (
                    <div className="nc__drawing">
                        <ShapePreview data={drawing} maxHeight={140} />
                    </div>
                )}
                <p className="nc__content">{content}</p>
            </div>

            <div className="nc__footer">
                <div className="nc__tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="nc__tag">#{tag}</span>
                    ))}
                </div>
                <div className="nc__actions">
                    <button className="nc__action nc__action--edit" onClick={onEdit} title="Edit">
                        <MdEdit />
                    </button>
                    <button className="nc__action nc__action--delete" onClick={onDelete} title="Delete">
                        <MdDelete />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notecard;