import React, {Component} from 'react';
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';

const POOL_DATA = {
    UserPoolId: 'ap-south-1_3fz4uuFk9',
    ClientId: '36ubrnr70p57f5l43g600h1uk1'
}

const userPool = new CognitoUserPool(POOL_DATA);

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            signedIn: false
        };
    }


    handleSubmit = (e) => {
        e.preventDefault();
        let {username, password} = this.state;
        const authData = {
            Username: username,
            Password: password
        };
        const authDetails = new AuthenticationDetails(authData);
        const userData = {
            Username: username,
            Pool: userPool
        };
        const that = this;
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authDetails, {
            onSuccess(result) {
                
                that.props.history.push({
                    pathname : "/",
                });
            },
            onFailure(err) {

            }
        })
    }

    handleChange = (e) => {
        if (e.target.id === 'username') {
            this.setState({username: e.target.value});
        } else if (e.target.id === 'password') {
            this.setState({password: e.target.value});
        }
    }

    render() {
        const {signedIn} = this.state;
        if (signedIn) {
            return (
                <div>
                    <h1>You have signed in!</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Username</label>
                        <input id='username' type='text' onChange={this.handleChange}/>
                        <label>Password</label>
                        <input id='password' type='password' onChange={this.handleChange}/>
                        <button>Sign In</button>
                    </form>
                </div>
            );
        }
    }
}

export default SignInForm;