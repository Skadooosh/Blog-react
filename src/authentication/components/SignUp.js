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

    }

    render() {
        const {verified} = this.state;
        let isDisabled = false;
        if(this.state.username === "")
            isDisabled = true
        if(this.state.password === "")
            isDisabled = true
        if(this.state.email === "")
            isDisabled = true


        let isConfirmDisabled = false;
        if(this.state.username === "")
            isConfirmDisabled = true
        if(this.state.confirmationCode === "")
            isConfirmDisabled = true



        if (verified) {

            return (
                <div className = "mt-4" style = {
                    {
                        width: "340px",
                        margin:" 50px auto"
                    }
                }>                    <form 
                          style = {{
                            width: "100%",
                            maxWidth: "420px",
                            padding: "12px",
                            margin: "0 auto",
                            marginBottom: "15px",
                            background: "#f7f7f7",
                            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
                            padding: "30px"
                          }}>
                        <h2 style = {{margin: "0 0 15px"}}>Sign Up</h2>
                        <div className = "form-label-group">
                        <input id='username' value = {this.state.username} className = "form-control mb-1" placeholder = "Username" type='text' onChange={this.handleChange}/>
                        </div>
                        <div className = "form-label-group">
                        <input id='email' value = {this.state.email} className = "form-control mb-1" placeholder = "Email" type='text' onChange={this.handleChange}/>
                        </div>
                        <div className = "form-label-group">
                        <input id='password' value = {this.state.password} className = "form-control mb-3" placeholder = "Password" type='password' onChange={this.handleChange}/>
                        </div>
                        <button disabled = {isDisabled} onClick ={this.onSubmitHandler} className = "btn btn-md btn-primary btn-block" >Sign up</button>
                        <button onClick = {e => { e.preventDefault(); this.setState({verified: false})}} className = "btn btn-md btn-secondary btn-block" >Confirm User</button>

                    </form>
                </div>
            );
        } else {
            return (
                <div className = "mt-4" style = {
                    {
                        width: "340px",
                        margin:" 50px auto"
                    }
                }>                    <form 
                          style = {{
                            width: "100%",
                            maxWidth: "420px",
                            padding: "12px",
                            margin: "0 auto",
                            marginBottom: "15px",
                            background: "#f7f7f7",
                            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
                            padding: "30px"
                          }}>
                                                  <h2 style = {{margin: "0 0 15px"}}>Confirm User</h2>
                        <div className = "form-label-group">
                        <input id='username' value = {this.state.username} className = "form-control mb-1" placeholder = "Username" type='text' onChange={this.handleChange}/>
                        </div>
                        <div className = "form-label-group">
                        <input id='confirmationCode' value = {this.state.confirmationCode} className = "form-control mb-1" placeholder = "Verification Code" type='text' onChange={this.handleChange}/>
                        </div>
                        <button disabled = {isConfirmDisabled} onClick ={this.onSubmitHandler} className = "btn btn-md btn-primary btn-block" >Create Account</button>
                        <button onClick = {e => { e.preventDefault(); this.setState({verified: true})}} className = "btn btn-md btn-secondary btn-block" >Sign Up</button>

                    </form>
                </div>
            )
        }

    }
}

export default SignUp;