import React, { Component } from 'react';
import {Button, Tabs, Tab} from 'react-bootstrap'
import './ChatLogView.css'

const base_url = "http://nij-disclose-stsd.gtri.gatech.edu";

export default class SubmissionDetail extends Component {

    constructor(props) {
        super(props);
        this.submission = JSON.parse(localStorage.getItem("submission"));
        this.image_src = "";
        this.raw_system_logs = "";
        this.photo_containers = [];
    }

    fetchSystemLogs = () => {
        const url = base_url + '/api/submission/log/';
        fetch(url + this.submission.submission_id).then(response => {
            return response.blob();
        })
        .then(log_blob => {
            var reader = new FileReader();
            reader.addEventListener('loadend', (e) => {
                this.raw_system_logs = e.srcElement.result;
            });
            reader.readAsText(log_blob);
        })
        .catch(error => {
            var message = "Image with GUID " + this.submission.submission_id + " not found.";
            console.log({error: error, message : message});
        })
    }

    fetchAllPhotos = () => {
        const meta_data_url = base_url + '/api/file/';
        fetch(meta_data_url + this.submission.submission_id).then(response => {
            return response.json()
        }).then(submission_files => {
            const photo_url = base_url + '/api/file/photo/';
            submission_files.forEach(submission_file => {
                const submission_id = this.submission.submission_id;
                const filename = submission_file.file.filename;
                fetch(photo_url + submission_id + '/' + filename).then(response => {
                    return response.blob();
                })
                .then(photo_blob => {
                    var objectURL = URL.createObjectURL(photo_blob);
                    this.photo_containers.push(
                        <div key={filename} className="col-lg-3 col-md-4 col-xs-6">
                            <img src={objectURL} className="img-fluid img-thumbnail"/>
                        </div>
                    );
                })
            });
        });
    }

    componentDidMount = () => {
        this.fetchSystemLogs();
        this.fetchAllPhotos();

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
                        <Button href='/feed'>Back to Latest Submissions</Button>
                    </div>
                    <div className="well">
                        <h3><span className="fa fa-user"></span> Submitter </h3>
                        <p>
                            <strong>User: </strong>{(this.submission.user === 'null') ? "George P. Burdell" : this.submission.user}<br/>
                            <strong>MongoID: </strong>{this.submission._id}<br/>
                            <strong>Submission GUID: </strong>{this.submission.submission_id}<br/>
                        </p>
                    </div>
                    <Tabs defaultActiveKet={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Messeges">
                            <div>
                            <h3><span className="fa fa-envelope"></span> Messages </h3>
                            <hr/>
                            {this.getChatLogViews()}
                        </div>
                        </Tab>
                        <Tab eventKey={2} title="Pictures/Videos">
                            <div>
                                <h3><span className="fa fa-picture-o"></span> Photos/Videos </h3>
                                <div className="container">
                                    <div className="row text-center text-lg-left">
                                        {this.photo_containers}
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={3} title="Logs">
                            <div>
                                <h3><span className="fa fa-file-text"></span> System Logs</h3>
                                <div>
                                    {this.raw_system_logs}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>



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
