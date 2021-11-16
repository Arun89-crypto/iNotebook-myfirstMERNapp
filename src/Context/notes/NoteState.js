import React, { useState, useContext } from "react";
import AlertContext from "../alert/AlertContext";
import NoteContext from "./NoteContext";

//handleAlert("Sign In Successfull", "danger");
const NoteState = (props) => {


    const host = "http://localhost:8000"

    const [notes, setNotes] = useState([]);

    //Fetch all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('inotebookToken')
            }
        })
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }


    //Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('inotebookToken')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();
        console.log(json);
        const note = {
            "_id": "618fb4853e50cb7a5a5188e2",
            "user": "618d0a13698abdb62e6182b9",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-11-13T12:50:13.327Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }

    //Delete Note
    const context = useContext(AlertContext);
    const { handleAlert } = context;
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('inotebookToken')
            }
        })
        const json = response.json();
        console.log(json);
        console.log("deleting.." + id);
        let newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
        handleAlert("Note deleted Successfully !!", "success")
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('inotebookToken')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        handleAlert("Note Edited Successfully !!", "success")
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;