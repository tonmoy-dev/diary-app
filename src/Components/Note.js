import React, { useState } from "react";
import '../App.css';
import './Note.css';

const Note = ({note, removeNote, updateNote, updateNoteRef}) => {
    const [isEditing, setEditing] = useState(false);
    const { title, date, noteDetails } = note;
    return (
        <div className="note-container">
            {/* view and edit note */}
            {
                !isEditing ? (
                    // view note
                    <div className="note-box">
                        <div className="note-info">
                            <h3 className="note-title">Title: {title}</h3>
                            <p className="note-date">Date: {date}</p>
                        </div>
                        <div className="note-details">
                            <p>{noteDetails}</p>
                        </div>
                        <div>
                            <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
                            <button className="delete-btn" onClick={() => removeNote(title)}>Delete</button>
                        </div>
                        
                    </div>
                ) : (
                    // edit note
                    <div className="note-box">
                        <div className="note-info">
                            <h3 className="note-title">Title: {title}</h3>
                            <p className="note-date">Date: {date}</p>
                        </div>
                        <textarea placeholder="Write your note here" ref={updateNoteRef}
                            rows="4" cols="30" />
                        <div>
                            <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
                            <button className="save-btn" onClick={() => { updateNote(title); setEditing(false) }}>Save</button>
                        </div>
                        
                    </div>
                )
            }
        </div>
    );
}

export default Note;