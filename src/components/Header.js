import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {AppContext} from './../AppContext'

class Header extends Component {

    render() {
        return(
            <AppContext.Consumer>
                {context => 
                <Navbar expand="lg" variant="light" bg="light">
                    <Container>
                        <Navbar.Brand href="/">Blog Template{console.log("Header has valid user : " + context.isValidUser)}
                        </Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link href="/home">View</Nav.Link>
                            {!context.isValidUser ? 
                            <React.Fragment>
                                <Nav.Link href="/auth">Sign up</Nav.Link>
                                <Nav.Link href="/signin">Sign in</Nav.Link>
                            </React.Fragment> 
                            :
                            <React.Fragment>
                                <Nav.Link href="/create">Create</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link onClick = {context.signOut} href="/">Sign Out</Nav.Link>
                            </React.Fragment> 
                            }
                        </Nav>
                    </Container>
                </Navbar>
                }
            </AppContext.Consumer>


        )
    }
}
export default Header;