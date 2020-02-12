import React, {Component} from 'react';
import swal from 'sweetalert';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js';

const POOL_DATA = {
    UserPoolId: 'ap-south-1_3fz4uuFk9',
    ClientId: '36ubrnr70p57f5l43g600h1uk1'
}

const userPool = new CognitoUserPool(POOL_DATA);

class SignUp extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        confirmationCode: '',
        verified: true
    }

    handleChange = e => {
        if (e.target.id === 'username') {
            this.setState({username: e.target.value});
        } else if (e.target.id === 'password') {
            this.setState({password: e.target.value});
        } else if (e.target.id === 'phone_number') {
            this.setState({phone_number: e.target.value});
        } else if (e.target.id === 'email') {
            this.setState({email: e.target.value});
        } else if (e.target.id === 'confirmationCode') {
            this.setState({confirmationCode: e.target.value});
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const {username, password, email, verified} = this.state;
        if (verified) {
            const attrList = [];
            const emailAttribute = {
                Name: 'email',
                Value: email
            }
            attrList.push(new CognitoUserAttribute(emailAttribute));

            userPool
                .signUp(username, password, attrList, null, (err, result) => {
                    if(err) {
                        swal({
                            title: "Error!",
                            text: err.message,
                            icon: "error",
                        })
		                return;
                    }
                    var cognitoUser = result.user;
                    swal({
                        title: "Signed Up! " + cognitoUser.getUsername(),
                        text: "Please check your mail and confirm your identity!",
                        icon: "success",
                    })
                    this.setState({
                        password : "",
                        email : "",
                        verified : false
                    })
                    
                })

        } else {
            const {username, confirmationCode} = this.state;
            const userData = {
                Username : username,
                Pool: userPool
            }
            const cognitoUser = new CognitoUser(userData);

            cognitoUser
                .confirmRegistration(confirmationCode, true, (err, result) => {
                    if(err) {
                        swal({
                            title: "Error!",
                            text: err.message,
                            icon: "error",
                        })
		                return;
                    } else {
                        console.log(result); // success
                        swal({
                            title: "Account Created!",
                            text: "Account created successfully",
                            icon: "success",
                        }).then(()=>{
                            this.props.history.push({
                                pathname : "/signin",
                            });
                        })
                    }
                })
        }
        e.target.reset();
    }

    render() {
        const {verified} = this.state;
        if (verified) {

            return (
                <div>
                    <form onSubmit={this.onSubmitHandler}>
                        <label>Username</label>
                        <input id='username' type='text' onChange={this.handleChange}/><br/>
                        <label>Email</label>
                        <input id='email' type='text' onChange={this.handleChange}/><br/>
                        <label>Password</label>
                        <input id='password' type='password' onChange={this.handleChange}/>
                        <br/>
                        <button>Sign up</button>
                    </form>
                        <button onClick = {e => this.setState({verified: false})}>Confirm User</button>
                </div>
            );
        } else {
            return (
                <div>
                    <form onSubmit={this.onSubmitHandler}>
                        <label>Username</label>
                        <input id='username' type='text' onChange={this.handleChange}/>
                        <label>Verification Code</label>
                        <input id='confirmationCode' type='text' onChange={this.handleChange}/>
                        <button>Create Account</button>
                    </form>
                        <button onClick = {e => this.setState({verified: true})}>Sign up</button>
                </div>
            )
        }

    }
}

export default SignUp;