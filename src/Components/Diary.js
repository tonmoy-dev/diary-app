import React, { useEffect, useRef, useState } from "react";

const Diary = () => {
    const [notes, setNotes] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const newNoteRef = useRef(null);
    const getNotesFromStorage = () => JSON.parse(localStorage.getItem('notes'));
    const addNotesToStorage = (notes) => localStorage.setItem("notes", JSON.stringify(notes))
    useEffect(() => {
        const getNotes = getNotesFromStorage();
        if (getNotes) {
            setNotes(getNotes);
        }
    }, []);
    const addNote = () => {
        const note = {
            // id: newNoteRef.current.value.length,
            text: newNoteRef.current.value,
        }
        const storeNotes = [note, ...notes];
        setNotes(storeNotes);
        newNoteRef.current.value = "";
        addNotesToStorage(storeNotes);
    }
    const editNote = () => setEditing(true)
    const removeNote = (text) => {
        const filteredNotes = notes.filter(note => note.text !== text);
        setNotes(filteredNotes);
        addNotesToStorage(filteredNotes);
    }
    const cancelToEdit = () => setEditing(false);
    const updateNote = (text) => {
        notes.find(note => note.text === text && (note.text = newNoteRef.current.value, true));
        addNotesToStorage(notes);
        setEditing(false);
        newNoteRef.current.value = "";
    }
    return (
        <div>
            <input type="text" placeholder="Write your note here" ref={newNoteRef} />
            <button onClick={addNote}>Add to Diary</button>
            <div>
                {
                    notes.map((note) =>
                        (
                            <div key={note.text}>
                                {
                                    !isEditing && (
                                        <div>
                                            <p>{note.text}</p>
                                            <button onClick={editNote}>Edit</button>
                                            <button onClick={() => removeNote(note.text)}>Delete</button>
                                        </div>
                                    )
                                }
                                {
                                    isEditing && (
                                        <div>
                                            <input type="text" placeholder="Write your note here" ref={newNoteRef} />
                                            <button onClick={cancelToEdit}>Cancel</button>
                                            <button onClick={() => updateNote(note.text)}>Save</button>
                                        </div>
                                    )
                            
                                }
                            </div>
                            )
                    )
                }
            </div>
        </div>
    );
}
export default Diary;