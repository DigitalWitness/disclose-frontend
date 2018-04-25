import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css'
import Auth from './Auth'
import config from './config.js'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            flash_login_message  : false,
            message : ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 &&
            this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    login() {
        const email = encodeURIComponent(this.state.email);
        const password = encodeURIComponent(this.state.password);
        const formData = "email="+email+"&password="+password;
        const login_url = config.base_url + '/api/login';
        fetch(login_url, {
            method : 'POST',
            headers : {'Content-Type':'application/x-www-form-urlencoded'},
            body : formData
        }).then(response => {
            return response.json();
        }).then(response => {
            if (response.success) {
                localStorage.setItem("email", this.state.email);
                localStorage.setItem("fname", response.token.local.fname);
                localStorage.setItem("lname", response.token.local.lname);
                Auth.authenticateUser(JSON.stringify(response.token._id));
                this.props.history.push('/profile');
            }
            else {
              this.setState({
                flash_login_message : true,
                message : response.message
              })
            }
        }).catch(error => {
            console.log(error)
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.login()
    }

    render() {
        return(
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                {
                  this.state.flash_login_message &&
                  <div className="alert alert-danger">{this.state.message}</div>
                }
                <h1><span className="fa fa-sign-in"></span> Login</h1>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                   </FormGroup>
                   <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                   </FormGroup>
                   <Button
                        block
                        bsSize="large"
                        disable={!this.validateForm()}
                        type="submit">
                   Login
                   </Button>
                </form>
            </div>
        )
    }
}
