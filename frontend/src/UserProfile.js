import React, { Component } from 'react'
import { PageHeader, Well, Button } from 'react-bootstrap'
import './UserProfile.css'

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.email = localStorage.getItem("email");
    }

    render() {
        return (
            <div className="UserProfile container row">
                <PageHeader className="text-center">
                    <p>Welcome</p>
                    <Button href='/login'>Logout</Button>
                </PageHeader>
                <Well>
                <h3><span className="fa fa-user"></span> Local</h3>
                    <p>
                        <strong>Email: </strong>{this.email}<br/>
                        <strong>ID:</strong><br/>
                    </p>
                </Well>
                <Button href="feed">Submissions</Button>
                <Button href="admin">Admin</Button>
            </div>
        )
    }

}
