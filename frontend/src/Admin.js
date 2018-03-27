import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import AccountCreationForm from './AccountCreation'
import './Admin.css'
import config from './config.js'

export default class Admin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal : false,
            users : []
        }
    }

    close = () => {
        this.setState({showModal : false })
        this.getUsers()
    }

    open = () => {
        this.setState({showModal : true })
    }

    userList = (users) => users.map( (user, index) =>
        <tr key={index}>
            <th>{user.local.fname}</th>
            <th>{user.local.lname}</th>
            <th>{user.local.email}</th>
            <th>
                <Button onClick={() => this.deleteUser(user.local.email)}>
                Remove
                </Button>
            </th>
        </tr>
    );

    getUsers = () => {
        const url = config.base_url + '/api/user';
        fetch(url).then(results => {
            return results.json()
        }).then((users) => {
            this.setState({
                users : users
            })
        }).catch((error) => {
            console.error(error);
        });
    }

    deleteUser = (email) =>  {
        const url = config.base_url + '/api/user';
        fetch(url + '/' + email, {
            method: 'delete',
            body : {}
        }).then(response => {
            this.getUsers()
        }).catch(error => {
            console.error(error)
        })
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        return (
            <div className="Admin">
                <div className="page-header text-center"><h1>Admin</h1></div>
                <AccountCreationForm showModal={this.state.showModal} close={this.close}/>
                <Table striped condensed>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Remove?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList(this.state.users)}
                    </tbody>
                </Table>
                <div className="text-center">
                    <Button onClick={this.open}>Create New User</Button>
                    <Button onClick={()=>this.props.history.goBack()}>Back to Profile</Button>
                </div>
            </div>
        );
    }

}
