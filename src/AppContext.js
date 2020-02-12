import React, { Component } from 'react';
import {isAuthenticated, logout} from './authentication/helper/auth'

export const AppContext = React.createContext();

export class MyProvider extends Component {
  state = {
    isValidUser : false
  }
  componentDidMount() {
    let isValidUser = isAuthenticated();
    this.setState({
      isValidUser
    })
  }
  render () {
    return(
      <AppContext.Provider value = {{isValidUser : this.state.isValidUser, 
        setValidity : () => {
        let isValidUser = isAuthenticated();
        this.setState({
          isValidUser
        })},
        signOut : () => {
            logout();
            let isValidUser = isAuthenticated();
            this.setState({
              isValidUser
            })
        }
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

