import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AlertContext from '../Context/alert/AlertContext';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const context = useContext(AlertContext);
    const { handleAlert } = context;

    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/createuser", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()
        console.log(json);
        localStorage.setItem('inotebookToken', json.authToken)
        history("/");
        handleAlert("User Created Successfully", "success");
    }
    return (
        <>
            <div className="container px-10 py-10">
                <h1>Sign Up</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Signup
