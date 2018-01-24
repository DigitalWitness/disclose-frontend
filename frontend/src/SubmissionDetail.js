import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import './ChatLogView.css'

export default class SubmissionDetail extends Component {

    constructor(props) {
        super(props);
        this.submission = JSON.parse(localStorage.getItem("submission"));
        this.image_src = "";
        console.log(this.submission);
    }

    componentDidMount = () => {
        const url = 'http://localhost:4000/api/submission/photo/';
        fetch(url + this.submission.submission_id).then(response => {
            return response.blob();
        })
        .then(image => {
            var myImage = document.querySelector('img');
            var objectURL = URL.createObjectURL(image);
            console.log(objectURL);
            myImage.src = objectURL;
        })
        .catch(error => {
            var message = "Image with GUID " + this.submission.submission_id + " not found.";
            console.log({error: error, message : message});
        })
    }

    getChatLogViews = () => {
        const chatLogViews = [];
        this.submission.content.messages.forEach((chatLog) => {
            chatLogViews.push(
                <div>
                    <ChatLogView messages={chatLog}/>
                    <hr/>
                </div>
            )
        });
        return chatLogViews;
    }

    render() {
        return (
            <div className="SubmissionDetail">
                <div className="container">
                    <div className="page-header text-center">
                        <h1>Submission Detail</h1>
                        <Button>Back to Latest Submissions</Button>
                    </div>
                    <div className="well">
                        <h3><span className="fa fa-user"></span> Submitter </h3>
                        <p>
                            <strong>User: </strong>{this.submission.user}<br/>
                            <strong>MongoID: </strong>{this.submission._id}<br/>
                            <strong>Submission GUID: </strong>{this.submission.submission_id}<br/>
                        </p>
                    </div>
                    <div className="well">
                        <h3><span className="fa fa-envelope"></span> Messages </h3>
                        <hr/>
                        {this.getChatLogViews()}
                    </div>
                    <div className="well">
                        <h3><span className="fa fa-picture-o"></span> Photos/Videos </h3>
                        <img id='img' className="img-thumbnail"/>
                    </div>
                </div>
            </div>
        )
    }
}

class ChatLogView extends Component {

    constructor(props) {
        super(props);
        this.contactFirstName = this.props.messages.contact.firstName;
        this.contactLastName = this.props.messages.contact.lastName;
    }

    getMessageContainers = () => {
        const messageContainers = [];
        console.log(this.props.messages);
        this.props.messages.message.forEach((message) => {
            messageContainers.push(
                <div className="message-container">
                    <span>{message.message}</span><br/>
                    <span className="time-left">{message.sender}</span>
                    <span className="time-right">{new Date(parseInt(message.time)).toString()}</span><br/>
                </div>
            )
        });
        return messageContainers;
    }

    render() {
        return(
            <div>
                <h4>Chat with {this.contactFirstName + " " + this.contactLastName} </h4>
                {this.getMessageContainers()}
            </div>
        )
    }

}
