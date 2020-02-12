import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, Button, Container, Row} from 'react-bootstrap';
import {isAuthenticated} from './../authentication/helper/auth'

class Home extends Component {
    state = {
        articles: [
            {
                id: 1,
                title: 'Javascript Fundamentals',
                shortDescription: 'This article is based on ES5 and ES6 concepts of Javascript...',
                imgUrl: '',
                type: 'Technology',
                theme: 'black',
                content: ''
            }
        ],
        articleType: [
            {   
                id : '01',
                name: 'Programming Languages',
                value: '1'
            }
        ],
        isValidUser : false
    }

    componentDidMount() {
        let data;      
        let isValidUser = isAuthenticated();
        this.setState({
          isValidUser
        })
        console.log(isValidUser)
        if(typeof(this.props.location.state)!=="undefined")
            data = this.props.location.state.response;

        if(typeof(data) !== "undefined") {

            let _articles = this.state.articles;
            _articles.push({
                id: 2,
                title: data.title,
                shortDescription: data.shortDescription,
                imgUrl: '',
                type: 'Technology',
                theme: 'black',
                content: data.content
            })
            this.setState({
                articles : _articles
            })
        }

    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        return (
            <Container>
                <Row style={{
                    marginBottom: '10px'
                }}>
                    {this
                        .state
                        .articleType
                        .map(type => (
                            <button key = {type.id} type="button" className="btn btn-primary">
                                {type.name}
                                <span
                                    style={{
                                    marginLeft: '4px'
                                }}
                                    className="badge badge-dark">{type.value}</span>
                                <span className="sr-only">unread blogs</span>
                            </button>
                        ))}
                </Row>
                <Row>
                    {this
                        .state
                        .articles
                        .map(article => (
                            <Card
                                key={article.id}
                                style={{
                                width: '18rem'
                            }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180"/> */}
                                <Card.Body>
                                    <Card.Title>{article.title}</Card.Title>
                                    <Card.Text>
                                        {article.shortDescription}
                                    </Card.Text>
                                    <Link to = {{
                                        pathname : "/view",
                                        state : {data : article}
                                    }}>
                                        <Button variant="primary">Continue reading</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        ))}
                </Row>
            </Container>
        )
    }
}

export default Home;