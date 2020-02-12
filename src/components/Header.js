import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {isAuthenticated,logout} from '../authentication/helper/auth'


class Header extends Component {
    state = {
        isValidUser : false
    }

    componentDidMount() {
        let isValidUser = isAuthenticated();
        console.log(isValidUser)
        this.setState({
          isValidUser
        })
    }

    render() {
        return(
            <Navbar style = {{marginBottom : '0.7rem', height: '7.5rem'}} bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href="/">Blog Template
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="/">View</Nav.Link>
                        { !this.state.isValidUser ? 
                        <React.Fragment>
                            <Nav.Link href="/auth">Sign Up</Nav.Link>
                            <Nav.Link href="/signin">Sign In</Nav.Link>
                        </React.Fragment> 
                        :
                        <React.Fragment>
                            <Nav.Link href="/create">Create</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            <Nav.Link onClick = {logout} href="/">Sign Out</Nav.Link>
                        </React.Fragment> 
                        }
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default Header;