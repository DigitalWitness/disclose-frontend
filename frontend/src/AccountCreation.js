import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Modal, Button} from 'react-bootstrap'
import config from './config.js'

export default class AccountCreationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName : "",
            lastName : "",
            email : "",
            password : ""
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        const formData = "email="+this.state.email
                        +"&password="+this.state.password
                        +"&fname="+this.state.firstName
                        +"&lname="+this.state.lastName;
        const signup_url = config.base_url + '/api/signup'
        fetch(signup_url, {
            method : 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : formData
        }).then((response) => {
            this.props.close()
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Account Creation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="firstName" bsSize="large">
                                <ControlLabel>First Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                           </FormGroup>
                           <FormGroup controlId="lastName" bsSize="large">
                               <ControlLabel>Last Name</ControlLabel>
                               <FormControl
                                   type="text"
                                   value={this.state.lastName}
                                   onChange={this.handleChange}
                               />
                            </FormGroup>
                            <FormGroup controlId="email" bsSize="large">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
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
                                type="submit">
                           Create
                           </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}
