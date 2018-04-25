import React, { Component } from 'react'
import { PageHeader, Well, Button } from 'react-bootstrap'
import Auth from './Auth'
import './UserProfile.css'

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.props = props
        this.fname = localStorage.getItem("fname");
        this.lname = localStorage.getItem("lname");
        this.email = localStorage.getItem("email");
    }

    logout() {
       Auth.deauthenticateUser();
       localStorage.clear();
    }

    render() {
        return (
            <div className="UserProfile container row">
                <PageHeader className="text-center">
                    <p>Welcome {this.fname}!</p>
                    <Button href="/login" onClick={this.logout}>Logout</Button>
                </PageHeader>
                <Well>
                <h3><span className="fa fa-user"></span> Local</h3>
                    <p>
                        <strong>User: </strong>{this.fname} {this.lname}<br/>
                        <strong>Email: </strong>{this.email}<br/>
                    </p>
                </Well>
                <Button href="feed">Submissions</Button>{' '}
                <Button href="admin">Admin</Button>
            </div>
        )
    }

}
