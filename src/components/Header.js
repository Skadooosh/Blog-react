import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';


class Header extends Component {
    render() {
        return(
            <Navbar style = {{marginBottom : '0.7rem', height: '7.5rem'}} bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href="/">Blog Template
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="/create">Create</Nav.Link>
                        <Nav.Link href="/">View</Nav.Link>
                        <Nav.Link href="/auth">LOG IN</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default Header;