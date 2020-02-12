import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from "./components/Home";
import Header from "./components/Header";
import CreateArticleComponent from './components/CreateArticleComponent';
import ViewArticleComponent from './components/ViewArticleComponent';
import SignUp from './authentication/components/SignUp';
import SignInForm from './authentication/components/SignIn';
import {isAuthenticated} from './authentication/helper/auth'

class App extends Component {
  state = {
    isValidUser : false
  }
  componentDidMount() {
    let isValidUser = isAuthenticated();
    this.setState({
      isValidUser
    })
  }
  render() {  
    return (
      <Router>
        <Header />
        <Switch> 
          <Route exact path = "/" component = {Home} />  
          <Route path = "/view" component = {ViewArticleComponent} />
          {!this.state.isValidUser && <Route path = "/auth" component = {SignUp} />}
          {!this.state.isValidUser && <Route path = "/signin" component = {SignInForm} />}
          {this.state.isValidUser && <Route path = "/create" component = {CreateArticleComponent} />}
          {this.state.isValidUser && <Route path = "/profile" component = {CreateArticleComponent} />}
        </Switch>
      </Router>
    );
  }
}
export default App;
