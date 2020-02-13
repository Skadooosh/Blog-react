import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, Button, Container, Row} from 'react-bootstrap';
import {AppContext} from './../AppContext'
import {getAuthenticatedUser} from './../authentication/helper/auth'


class Home extends Component {
    static contextType = AppContext;

    state = {
        articles: [
        ],
        articleType: [
            // {   
            //     id : '01',
            //     name: 'Programming Languages',
            //     value: '1'
            // }
        ]
    }

    async componentDidMount() {
            let {articles} = this.state;
            try {
                const response = await fetch(`https://r7l0un3112.execute-api.ap-south-1.amazonaws.com/dev/`, {
                    method: 'GET', // *GET, POST, PUT, DELETE, etc. ,
                    });
                const json = await response.json();
            
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


    render() {
        return (
            <Container>
                <Row style={{
                    marginTop: '5rem'
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
                {!this.context.isValidUser ?
                <div>
                <Row className = "mb-5">
                <span className = "mx-auto">Already have an account? <Link to = "/signin">Sign in.</Link></span>
                </Row>
                </div>
                :
                <Row>
                    <h3 className = "mx-auto mt-5 mb-3">View all Articles</h3>
                </Row>
                }

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