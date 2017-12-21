import React, { Component } from 'react'
import { PageHeader, Well, Button } from 'react-bootstrap'
import './UserProfile.css'

export default class UserProfile extends Component {

    render() {
        return (
            <div className="UserProfile">
                <PageHeader className="text-center">
                    <h1>Welcome</h1>
                    <Button>Logout</Button>
                </PageHeader>

                <Well bsSize="lg">
                    <strong>Email:</strong><br/>
                    <strong>ID:</strong><br/>
                </Well>
                <Button href="home">Submissions</Button>
                <Button href="admin">Admin</Button>
            </div>
        )
    }

}
