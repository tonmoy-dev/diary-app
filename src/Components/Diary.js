import React, { useEffect, useRef, useState } from "react";
import '../App.css';
import './Diary.css';
import Note from "./Note";

const Diary = () => {
    const [notes, setNotes] = useState([]);
    const [orderedNotes, setOrderedNotes] = useState([]);
    const [noteData, setNoteData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [monthValue, setMonthValue] = useState('');
    const updateNoteRef = useRef(null);
    const yearRef = useRef(null);

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

    // handle note input fields
    const handleFieldOnBlur = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        const newData = { ...noteData };
        newData[fieldName] = value;
        setNoteData(newData);
    }

    // write and add note
    const handleAddNote = (e) => {
        e.preventDefault();
        const newNote = {
            title: noteData.title,
            date: noteData.date,
            noteDetails: noteData.noteDetails
        }
        const storeNotes = [newNote, ...notes];
        setNotes(storeNotes);
        addNotesToStorage(storeNotes);
        setLoading(false);
        e.target.reset();
    }

    // remove a single note
    const removeNote = (text) => {
        const filteredNotes = notes.filter(note => note.title !== text);
        setNotes(filteredNotes);
        addNotesToStorage(filteredNotes);
    }

    // update or edit a single note
    const updateNote = (text) => {
        notes.find(note => note.title === text && (note.noteDetails = updateNoteRef.current.value, true));
        addNotesToStorage(notes);
        updateNoteRef.current.value = "";
    }
    
    
    // notes sorting
    const handleSortedNotes = (text) => {
        const sortedNotes = notes.sort((a, b) => (new Date(a.date)) - (new Date(b.date)));
        switch (text) {
            case 'Newest First':
                setOrderedNotes(sortedNotes.reverse());
                setLoading(true);
                break;
            case 'Oldest First':
                setOrderedNotes(sortedNotes);
                setLoading(false);
                break; 
            default:
                setLoading(false);
        }
    }
    // notes filtering
    const handleFiltedNotes = (text, value,e) => {
        e.preventDefault();
        const currentValue = Number(value);
        switch (text) {
            case 'month':
                const filtedNotesByMonth = notes.filter(e => {
                    var month = e.date.split('-')[1];
                    return currentValue === +month;
                });
                setOrderedNotes(filtedNotesByMonth);
                setLoading(true);
                break;
            case 'year':
                const filtedNotesByYear = notes.filter(e => {
                    var year = e.date.split('-')[0];
                    return currentValue === +year;
                });
                setOrderedNotes(filtedNotesByYear);
                setLoading(true);
                break;
            
            default:
              setLoading(false);
        }
    }

    // month value handler
    const handleMonthValue = (e) => {
        setMonthValue(e.target.value);
    };
        
    return (
        <div className="container">
            <div className="diary-container">
                <div className="flex-container card">
                    <h2 className="diary-title">Diary App</h2>
                    {/* Add new note */}
                    <form className="diary-content" onSubmit={handleAddNote}>
                        <div>
                            <input name="title" onBlur={handleFieldOnBlur} type="text" placeholder="Write a title" required />
                            <input name="date" onBlur={handleFieldOnBlur} type="date" />
                        </div>
                        <textarea placeholder="Write your note here" name="noteDetails" onBlur={handleFieldOnBlur}
                            rows="4" cols="30" />
                        <button className="add-diary-btn" type="submit">Add to Diary</button>
                    </form>
                    {/* All note filters */}
                    <div className="filters-container">
                        <h4>Notes Filters</h4>
                        {/* Filters by oldest or newest */}
                        <div className="filter-box">
                            <button onClick={() => handleSortedNotes('Newest First')}>Newest To Oldest</button>
                            <button onClick={() => handleSortedNotes('Oldest First')}>Oldest To Newest</button>
                        </div>
                        {/* Filter by month */}
                        <div>
                            <form className="filter-box" onSubmit={(e) => handleFiltedNotes('month', monthValue, e)}>
                                <select onBlur={handleMonthValue}>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <button type="submit">Filter by Month</button>
                            </form>
                        </div>
                        {/* Filter by year */}
                        <div className="filter-box">
                            <input type="text" name="year" ref={yearRef} />
                            <button onClick={() => handleFiltedNotes('year', yearRef.current.value)}>Filter by Year</button>
                        </div>
                    </div>
                </div>
                {/* View notes to UI */}
                <div className="notes-container">
                    <h3>Your Notes</h3>
                    <div>
                        {
                            !isLoading ? (
                                // notes collected from localStorage
                                notes.length !== 0 ? (
                                    notes.map((note) =>
                                        <Note key={note.title} note={note} removeNote={removeNote} updateNote={updateNote} updateNoteRef={updateNoteRef} />
                                    )
                                ) : (
                                    <div className="empty-note-box">
                                        <p>Please add more notes. Notes are unavailable here.</p>
                                    </div>
                                )
                            ) : (
                                // sorted or filted notes
                                orderedNotes.length !== 0 ? (
                                    orderedNotes.map((note) =>
                                        <Note key={note.title} note={note} removeNote={removeNote} updateNote={updateNote} updateNoteRef={updateNoteRef} />)
                                ) : (
                                    <div className="empty-note-box">
                                        <p>Please add more notes. Notes are unavailable here.</p>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Diary;