import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from "./components/Home";
import Header from "./components/Header";
import CreateArticleComponent from './components/CreateArticleComponent';
import ViewArticleComponent from './components/ViewArticleComponent';
import SignUp from './authentication/components/SignUp';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import SignInForm from './authentication/components/SignIn';
Amplify.configure(aws_exports);


class App extends Component {
  render() {  
    return (
      <Router>
        <Header />
        <Switch> 
          <Route exact path = "/" component = {Home} />
          <Route path = "/create" component = {CreateArticleComponent} />
          <Route path = "/view" component = {ViewArticleComponent} />
          <Route path = "/auth" component = {SignUp} />
          <Route path = "/signin" component = {SignInForm} />
        </Switch>
      </Router>
    );
  }
}
export default App;
