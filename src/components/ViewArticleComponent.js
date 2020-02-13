import React from 'react';
import {Jumbotron, Button, Container} from 'react-bootstrap'

const ViewArticleComponent = (props) => {
    console.log(props)
    return (
        <Container>
            <Jumbotron>
                <h1>{props.location.state.data.title}</h1>
                <p>
                {props.location.state.data.shortDescription}
                </p>
                <p>
                    {props.location.state.data.content}
                    <br/><br/><Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
        </Container>
    )
}
export default ViewArticleComponent;
