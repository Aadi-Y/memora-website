import React from 'react';
import "./NotesDetail.css";
import moment from "moment";
import ShapePreview from "./ShapePreview";

function NotesDetail({ item }) {
    return (
        <div className="nd">
            <div className="nd__header">
                <h2 className="nd__title">{item?.title}</h2>
                <span className="nd__date">{moment(item?.createdOn).format("MMM D, YYYY")}</span>
            </div>
            {item?.drawing && (
                <div className="nd__drawing">
                    <ShapePreview data={item.drawing} />
                </div>
            )}
            <div className="nd__body">
                <p className="nd__content">{item?.content}</p>
            </div>
            <div className="nd__tags">
                {item?.tags && item.tags.length > 0 ? (
                    item.tags.map((tag, index) => (
                        <span key={index} className="nd__tag">#{tag}</span>
                    ))
                ) : (
                    <span className="nd__no-tags">No tags</span>
                )}
            </div>
        </div>
    );
}

export default NotesDetail;