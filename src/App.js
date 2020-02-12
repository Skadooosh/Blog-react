import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from "./components/Home";
import Header from "./components/Header";
import CreateArticleComponent from './components/CreateArticleComponent';
import ViewArticleComponent from './components/ViewArticleComponent';
import SignUp from './authentication/components/SignUp';
import SignInForm from './authentication/components/SignIn';
import {MyProvider} from './AppContext'

class App extends Component {

  render() {  
    return (
      <MyProvider>
        <Router>
              <Header />
              <Switch> 
                <Route exact path = "/" component = {Home} />  
                <Route path = "/view" component = {ViewArticleComponent} />
                <Route path = "/auth" component = {SignUp} />
                <Route path = "/signin" component = {SignInForm} />
                <Route path = "/create" component = {CreateArticleComponent} />
                <Route path = "/profile" component = {CreateArticleComponent} />
              </Switch>
            </Router>
      </MyProvider>
    );
  }
}
export default App;
