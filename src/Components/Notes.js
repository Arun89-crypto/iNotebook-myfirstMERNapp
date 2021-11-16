import React, { useContext, useEffect } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes } = context;
    const history = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('inotebookToken')) {
            getNotes();
        } else {
            history('/login');
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes till now'}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem note={note} key={note._id} />;
                    })
                }
            </div>
        </>

    )
}

export default Notes
