import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, Button, Container, Row} from 'react-bootstrap';

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
            },
            {   
                id : '02',
                name: 'FrontEnd Framework',
                value: '1'
            },
            {   
                id : '03',
                name: 'Backend',
                value: '1'
            },
            {   
                id : '04',
                name: 'Fitness',
                value: '1'
            },
            {   
                id : '05',
                name: 'Machine Learning',
                value: '0'
            },
            {   
                id : '06',
                name: 'Artificial Intelligence',
                value: '0'
            }
        ]
    }

    async componentDidMount() {
        try {
            let {articles} = this.state;
            const response = await fetch(`https://r7l0un3112.execute-api.ap-south-1.amazonaws.com/dev/all`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.           
            });
            const json = await response.json();
            console.log(json);
            json.forEach(e => {
                articles.push({
                    id: e.UserId,
                    title: e.Article.title,
                    shortDescription: e.Article.shortDescription,
                    imgUrl: '',
                    type: '',
                    theme: '',
                    content: e.Article.content
                })
            })
            this.setState({
                articles
            })
        }
        catch(err) {
            console.log(err);
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
                            <button style = {{margin: '4px'}} key = {type.id} type="button" className="btn btn-primary">
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
                <Row className = "mt-5">
                    <button style = {{margin: '4px'}} type="button" className="btn btn-info mx-auto">
                    Getting Started                
                    </button>
                </Row>
                <Row className = "mb-5">
                <span className = "mx-auto">Already have an account? <Link to = "/signin">Sign in.</Link></span>
                </Row>
                <Row>
                   <h3 className = "mx-auto">View all Articles</h3>
                </Row>
                <Row>
                    {this
                        .state
                        .articles
                        .map(article => (
                            <Card
                                key={article.id}
                                style={{
                                width: '18rem',
                                margin: '4px 4px'
                            }}>
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