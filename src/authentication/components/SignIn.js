import React, {Component} from 'react';
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import {AppContext} from './../../AppContext'


const POOL_DATA = {
    UserPoolId: '',
    ClientId: ''
}

const userPool = new CognitoUserPool(POOL_DATA);

class SignInForm extends Component {
    static contextType = AppContext;
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
                that.context.setValidity();
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
        let isDisabled = false;
        if(this.state.username === "")
            isDisabled = true
        if(this.state.password === "")
            isDisabled = true




        if (signedIn) {
            return (
                <div className= "text-center mt-4">
                    <h1>You have Successfully Signed in!</h1>
                </div>
            );
        } else {
            return (
                <div style = {
                    {
                        width: "340px",
                        margin:" 50px auto"
                    }
                }>
                <form 
                      style = {{
                        width: "100%",
                        maxWidth: "420px",
                        margin: "0 auto",
                        marginBottom: "15px",
                        background: "#f7f7f7",
                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
                        padding: "30px"
                      }}>
                    <h2 style = {{margin: "0 0 15px"}}>Sign In</h2>
                    <div className = "form-label-group">
                    <input id='username' value = {this.state.username} className = "form-control mb-1" placeholder = "Username" type='text' onChange={this.handleChange}/>
                    </div>
                    <div className = "form-label-group">
                    <input id='password' value = {this.state.password} className = "form-control mb-3" placeholder = "Password" type='password' onChange={this.handleChange}/>
                    </div>
                    <button disabled = {isDisabled} onClick ={this.handleSubmit} className = "btn btn-md btn-primary btn-block">Sign in</button>
                </form>
            </div>
            );
        }
    }
}

export default SignInForm;
