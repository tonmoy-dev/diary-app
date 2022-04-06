import React, { useEffect, useRef, useState } from "react";
import Note from "./Note";

const Diary = () => {
    const [notes, setNotes] = useState([]);
    const newNoteRef = useRef(null);
    const updateNoteRef = useRef(null);

    // collect notes from localStorage
    const getNotesFromStorage = () => JSON.parse(localStorage.getItem('notes'));

    // save notes to localStorage
    const addNotesToStorage = (notes) => localStorage.setItem("notes", JSON.stringify(notes))
    
    // load all notes
    useEffect(() => {
        const getNotes = getNotesFromStorage();
        if (getNotes) {
            setNotes(getNotes);
        }
    }, []);

    // write and add note
    const addNote = () => {
        const note = {
            text: newNoteRef.current.value,
        }
        const storeNotes = [note, ...notes];
        setNotes(storeNotes);
        newNoteRef.current.value = "";
        addNotesToStorage(storeNotes);
    }

    // remove a single note
    const removeNote = (text) => {
        const filteredNotes = notes.filter(note => note.text !== text);
        setNotes(filteredNotes);
        addNotesToStorage(filteredNotes);
    }

    // update or edit a single note
    const updateNote = (text) => {
        notes.find(note => note.text === text && (note.text = updateNoteRef.current.value, true));
        addNotesToStorage(notes);
        updateNoteRef.current.value = "";
    }

    return (
        <div>
            <input type="text" placeholder="Write your note here" ref={newNoteRef} />
            <button onClick={addNote}>Add to Diary</button>
            <div>
                {
                    notes.map((note) =>
                        <Note key={note.text} note={note} removeNote={removeNote} updateNote={updateNote} updateNoteRef={updateNoteRef} />
                    )
                }
            </div>
        </div>
    );
}
export default Diary;