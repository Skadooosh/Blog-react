import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {AppContext} from './../AppContext'

class Header extends Component {

    render() {
        return(
            <AppContext.Consumer>
                {context => 
                <Navbar style = {{marginBottom : '0.7rem', height: '7.5rem'}} bg='dark' variant='dark'>
                    <Container>
                        <Navbar.Brand href="/">Blog Template{console.log("Header has valid user : " + context.isValidUser)}
                        </Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link href="/">View</Nav.Link>
                            {!context.isValidUser ? 
                            <React.Fragment>
                                <Nav.Link href="/auth">Sign Up</Nav.Link>
                                <Nav.Link href="/signin">Sign In</Nav.Link>
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