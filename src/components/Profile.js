import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, Button, Container, Row} from 'react-bootstrap';
import {getAuthenticatedUser} from './../authentication/helper/auth'

class Profile extends Component {

    state = {
        articles: [
        ],
        articleType: [
            {   
                id : '01',
                name: 'Programming Languages',
                value: '1'
            }
        ]
    }
    deletePost = async () => { 
        getAuthenticatedUser().getSession(async(err, session) => {
            if(err) {
                return;
            }
            try {
            const response = await fetch(`https://r7l0un3112.execute-api.ap-south-1.amazonaws.com/dev/br-article`
            , {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc. ,
                headers: {  
                    "Content-Type":"application/json",
                    'Authorization': session.getIdToken().getJwtToken(),
                  }
                });
            const json = await response.json(); 
            if(json.status == "deleted") {
               this.setState({
                   articles: []
               })
            }
        }
        catch(err) {
            console.log(err);
        }
        })
    }

    componentDidMount() {
        getAuthenticatedUser().getSession(async(err, session) => {
            try {
            const response = await fetch(`https://r7l0un3112.execute-api.ap-south-1.amazonaws.com/dev/single/${'?accessToken='+session.getAccessToken().getJwtToken()}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc. ,
                headers: {
                    'Authorization': session.getIdToken().getJwtToken()
                  }
                });
            const json = await response.json();
            console.log(json);
            let {articles} = this.state;
            articles.push({
                id: json.UserId,
                title: json.Article.title,
                shortDescription: json.Article.shortDescription,
                imgUrl: '',
                type: '',
                theme: '',
                content: json.Article.content
            })
            this.setState({
                articles
            })
        }
        catch(err) {
            console.log(err);
        }
        })
    }
    render() {
        return(
            <Container>
                <Row className = "mt-5">
                    <h2>My Articles</h2>
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
                                    <Button style={{margin : "10px"}} variant="primary">Edit Post</Button>
                                    <Button onClick = {this.deletePost} style={{margin : "10px"}} variant="primary">Delete Post</Button>
                                </Card.Body>
                            </Card>
                        ))}
                </Row>

            </Container>        )
    }
}
export default Profile;