import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import Home from "./components/Home";
import Header from "./components/Header";
import {MyProvider} from './AppContext'
import CreateArticleComponent from './components/CreateArticleComponent';
import ViewArticleComponent from './components/ViewArticleComponent';
import SignUp from './authentication/components/SignUp';
import SignInForm from './authentication/components/SignIn';
import Profile from './components/Profile';

class App extends Component {

  render() {  
    return (
      <MyProvider>
        <Router>
          <div className ="text-center cover-container d-flex h-100 p-3 mx-auto flex-column">
              <Header />
              <Switch> 
                <Route exact path = "/" component = {CoverPage} />
                <Route exact path = "/home" component = {Home} />  
                <Route path = "/view" component = {ViewArticleComponent} />
                <Route path = "/auth" component = {SignUp} />
                <Route path = "/signin" component = {SignInForm} />
                <Route path = "/create" component = {CreateArticleComponent} />
                <Route path = "/profile" component = {Profile} />
              </Switch>
          </div>
            </Router>
      </MyProvider>
    );
  }
}

const CoverPage = () => {
    return(
      <React.Fragment>
        <main className = "inner cover" style= {{marginTop : "10rem"}}>
          <h1 className  = "cover-heading"> React Blogging Website Template </h1>
          <p className  = "cover-lead">
            Create and View blogs
          </p>
          <Link to = "/home">
            <Button variant="primary">Start Blogging!!</Button>
           </Link>        
        </main>
      </React.Fragment>
    )
}
export default App;
