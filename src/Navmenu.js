import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';

const Navmenu = (props) => {
    const mystyle = {
        mynav: {
            fontSize: '12px',
            fontWeight: 600
        },
        mybreadcrumb: {
            fontSize: '10px'
        }
    };
    return (
        <>
            <Navbar bg="light" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href={process.env.REACT_APP_API_BASEPATH}>
                        <img src={process.env.PUBLIC_URL + "/crazycooks-logo.png"} height="40" alt="" border="0" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="text-end">
                        <Nav className="ms-auto" style={mystyle.mynav}>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="https://www.crazycooks.in">Recipes</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navmenu;