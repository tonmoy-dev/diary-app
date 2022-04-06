import React, { useState } from "react";

const Note = ({note, removeNote, updateNote, updateNoteRef}) => {
    const [isEditing, setEditing] = useState(false);

    return (
        <div>
            {/* view and edit note */}
            {
                !isEditing ? (
                    <div>
                        <p>{note.text}</p>
                        <button onClick={() => setEditing(true)}>Edit</button>
                        <button onClick={() => removeNote(note.text)}>Delete</button>
                    </div>
                ) : (
                    <div>
                        <input type="text" placeholder="Write your note here" ref={updateNoteRef} />
                        <button onClick={() => setEditing(false)}>Cancel</button>
                        <button onClick={() => { updateNote(note.text); setEditing(false) }}>Save</button>
                    </div>
                )
            }
        </div>
    );
}

export default Note;