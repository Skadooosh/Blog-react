import React, {Component} from 'react';
import Auth from "@aws-amplify/auth";

class SignUp extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        confirmationCode: '',
        phone_number : '',
        verified: false
    }

    handleChange = e => {
        if (e.target.id === 'username') {
          this.setState({
              username: e.target.value
          });
        } else if (e.target.id === 'password') {
          this.setState({
              password: e.target.value
          });
        } else if (e.target.id === 'phone_number') {
          this.setState({
              phone_number: e.target.value
          });
        } else if (e.target.id === 'email') {
          this.setState({
              email: e.target.value
          });
        } else if (e.target.id === 'confirmationCode') {
          this.setState({
              confirmationCode: e.target.value
          });
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const { username, password, email, verified } = this.state;  
        if(verified) {

            Auth.signUp({
                username: username,
            password: password,
            attributes: {
                email: email,
            }
        })
        .then(() => console.log("Signed up"))
        .catch(err => console.log(err))
        
        this.setState({
            password: '',
            email: '',
            verified: true
        })
        e.target.reset();
    }else {
        const { username, confirmationCode } = this.state;
        Auth.confirmSignUp(username, confirmationCode)
        .then(() => {
            console.log('Successfully confirmed signed up')
            this.props.handleSignup();
        })
        .catch((err) => console.log(`Error confirming sign up - ${ err }`))
    }


    }

    render() {
        const {verified} = this.state;
        if(verified) {

            return (
                <div>
                <form onSubmit={this.onSubmitHandler}>
                    <label>Username</label>
                    <input id='username' type='text' onChange={this.handleChange}/>
                    <label>Password</label>
                    <input id='password' type='password' onChange={this.handleChange}/>
                    <label>Email</label>
                    <input id='email' type='text' onChange={this.handleChange}/>
                    <button>Sign up</button>
                </form>
                </div>
        );
        }
        else {
            return(<div>
            <form onSubmit={this.onSubmitHandler}>
                <label>Username</label>
                <input id='username' type='text' onChange={this.handleChange}/>
                <label>Password</label>
                <input id='password' type='password' onChange={this.handleChange}/>
                <label>Verification Code</label>
                <input id='confirmationCode' type='text' onChange={this.handleChange}/>
                <button>Submit</button>
            </form>
            </div>)
        }

    }
}

export default SignUp;