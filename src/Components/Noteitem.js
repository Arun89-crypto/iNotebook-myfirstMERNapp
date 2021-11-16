import React, { useContext, useState } from 'react'
import { Card } from 'react-bootstrap'
import NoteContext from '../Context/notes/NoteContext';
import { Modal, Button, Form } from 'react-bootstrap';

const Noteitem = ({ note }) => {
    const context = useContext(NoteContext);
    const { deleteNote, editNote } = context;


    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [tag, setTag] = useState(note.tag);

    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); setTitle(note.title); setDescription(note.description); setTag(note.tag) };
    const handleShow = () => setShow(true);


    const handleSave = (id, title, description, tag) => {
        editNote(id, title, description, tag);
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control type="text" placeholder="Tag" id="tag" value={tag} onChange={(e) => setTag(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave(note._id, title, description, tag)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card className="col-md-3 my-2 mx-1">
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{note.tag}</Card.Subtitle>
                    <Card.Text>
                        {note.description}
                    </Card.Text>
                    <i className="fas fa-trash-alt mx-2" onClick={() => deleteNote(note._id)}></i>
                    <i className="far fa-edit mx-2" onClick={() => handleShow(note)}></i>
                </Card.Body>
            </Card>
        </>
    )
}

export default Noteitem
