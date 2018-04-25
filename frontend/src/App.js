import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Routes from './Routes'
import './App.css'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isAuthenticating: true
        };
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
        };
        return (
            <div>
              <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default withRouter(App);
