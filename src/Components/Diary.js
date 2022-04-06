import React, { useRef, useState } from "react";

const Diary = () => {
    const [notes, setNotes] = useState();
    const newNoteRef = useRef(null);
    const addNote = () => {
        setNotes(newNoteRef.current.value);
    }
    
    return (
        <div>
            <input type="text" placeholder="Write your note here" ref={newNoteRef} />
            <button onClick={addNote}>Add to Diary</button>
        </div>
    )
}
export default Diary;