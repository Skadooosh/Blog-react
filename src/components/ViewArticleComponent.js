import React from 'react';
import {Jumbotron, Button, Container, Row, Form, Col} from 'react-bootstrap'
import {AppContext} from './../AppContext';
import {Link} from 'react-router-dom';

const ViewArticleComponent = (props) => {

    return (
        <Container>
            <Jumbotron style = {{marginTop : "5rem"}}>
                <h1>{props.location.state.data.title}</h1>
                <p>
                {props.location.state.data.shortDescription}
                </p>
                <p>
                    {props.location.state.data.content}
                    <br/><br/><Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
            
            <Row>
                <div style = {{
                    width: "100%",
                    maxWidth: "420px",
                    margin: "0 auto",
                    marginBottom: "15px",
                    background: "#f7f7f7",
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
                    padding: "30px"
                }}>
                    <h4>Join the Discussion!</h4>
                    <Form>
                        <Form.Row>
                        <Form.Group as={Col} controlId="name">
                                <Form.Control type="name" placeholder="Enter Name"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="comment">
                                <Form.Control as="textarea" placeholder="Enter comment" rows="3"/>
                        </Form.Group>
                    <AppContext.Consumer> 
                        { value => 
                        <React.Fragment>
                        {value.isValidUser ? 
                        <div>
                            <Button variant="primary" type="submit">
                            Post Comment
                            </Button>
                        </div>
                        :
                        <div>
                        <Link to ="/signin">
                        <Button variant="primary" type="submit">
                            Signin / Signup
                        </Button>
                        </Link>
                        </div>
                         }
                        </React.Fragment>
                        }
                    </AppContext.Consumer>
               
                    </Form>
                </div>
            </Row>
        </Container>

    )
}
export default ViewArticleComponent;
