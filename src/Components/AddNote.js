import { Form, Button } from 'react-bootstrap'
import NoteContext from '../Context/notes/NoteContext';
import React, { useContext, useState } from 'react'
import AlertContext from '../Context/alert/AlertContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const contextAlert = useContext(AlertContext);
    const { handleAlert } = contextAlert;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = () => {
        addNote(note.title, note.description, note.tag);
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('tag').value = '';
        handleAlert("Note Added !!", "primary");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value })
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <Form className="my-3">
                    <Form.Group className="mb-3" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" id="title" onChange={onChange} minLength={5} required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" id="description" onChange={onChange} minLength={5} required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Tag</Form.Label>
                        <Form.Control type="text" placeholder="Tag" onChange={onChange} id="tag" />
                    </Form.Group>
                    <Button variant="primary" onClick={handleClick}>
                        Add Note
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default AddNote
