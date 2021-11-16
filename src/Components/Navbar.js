import React, { useEffect } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const NavbarComp = () => {
    const history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('inotebookToken');
        history('/login');
    }
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location])
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
                    <Navbar.Brand>iNoteBook</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/about" style={{ textDecoration: "none", cursor: "pointer", color: `${(location.pathname === "/about" ? "#000" : "rgb(100,100,100)")}` }}>About</Link>
                    </Nav>
                    {
                        (!localStorage.getItem('inotebookToken')) ? (
                            <div className="d-flex">
                                <Link variant=" btn btn-primary" className="mx-2" role="button" to="/login">Log In</Link>
                                <Link variant=" btn btn-primary" className="mx-2" role="button" to="/signup">Sign Up</Link>
                            </div>
                        ) : (
                            <div className="d-flex">
                                <Button variant=" btn btn-primary" className="mx-2" role="button" onClick={handleLogout}>Sign Out</Button>
                            </div>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComp
