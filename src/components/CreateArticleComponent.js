import React, {Component} from 'react';
import {Form, Col, Button, Container} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class CreateArticleComponent extends Component {
    state = {
        email : "",
        title : "",
        shortDescription : "",
        content : "",
    }
    hasSubmitted = false;

    onTextChangeHandler = (e, type) => {
        switch(type) {
            case 'email' :
                this.setState({
                    email : e.target.value
                })
                break;
            case 'title' :
                this.setState({
                    title : e.target.value
                })
                break;
            case 'shortDescription' :
                this.setState({
                    shortDescription : e.target.value
                })
                break;
            case 'content' :
                this.setState({
                    content : e.target.value
                })
                break;
            default : 
            
        }
    }

    onCreateArticleHandler = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname : "/",
            state : {response : this.state}
        });
    }
    render() {

        this.hasSubmitted = false;
        for(var key in this.state) {
            if(this.state[key] === "") {
                this.hasSubmitted = true;
            }
        }
        return (
            <Container>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange = {e => this.onTextChangeHandler(e,"email")}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control placeholder="Enter Title " onChange = {e => this.onTextChangeHandler(e,"title")}/>
                    </Form.Group>

                    <Form.Group controlId="shortdesc">
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control placeholder="Enter Short Description" onChange = {e => this.onTextChangeHandler(e,"shortDescription")}/>
                    </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows="7" onChange = {e => this.onTextChangeHandler(e,"content")}/>
                        </Form.Group>
                    <Button disabled = {this.hasSubmitted} variant="primary" type="submit" onClick = {this.onCreateArticleHandler}>
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default withRouter(CreateArticleComponent);