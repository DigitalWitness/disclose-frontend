import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css'
import Auth from './Auth'

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : "",
            password : ""
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
        console.log("Logging in")
        const email = encodeURIComponent(this.state.email);
        const password = encodeURIComponent(this.state.password);
        const formData = "email="+email+"&password="+password;
        fetch('http://localhost:4000/login', {
            method : 'POST',
            headers : {'Content-Type':'application/x-www-form-urlencoded'},
            body : formData
        }).then(response => {
            if (response.status !== 200) {
                console.error('Error | Status Code: ' + response.status);
                alert("Username not found or password incorrect.")
                return;
            }
            localStorage.setItem("email", this.state.email);
            this.props.history.push('/profile');
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
