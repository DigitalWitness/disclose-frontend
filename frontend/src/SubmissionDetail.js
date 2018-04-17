import React, { Component } from 'react';
import {FormControl, Button, Tabs, Tab, Badge} from 'react-bootstrap'
import JSONPretty from 'react-json-pretty';
import ReactPlayer from 'react-player'
import './ChatLogView.css'
import config from './config.js'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const base_url = config.base_url;
const default_position = [33.7490, -84.3880];
const default_zoom = 15;

export default class SubmissionDetail extends Component {

    constructor(props) {
        super(props);
        this.submission = JSON.parse(localStorage.getItem("submission"));
        this.image_src = "";
        this.location = this.submission.location;
        if (this.location === null ||
          this.location[0] === null ||
          this.location[1] === null) {
          this.location = default_position;
        }
        this.state = {
          submission : JSON.parse(localStorage.getItem("submission")),
          system_logs : "Not Submitted",
          tags : this.submission.tags,
          location : this.location,
          zoom : default_zoom,
          tagToAdd : ""
        }
        this.photo_containers = [];
        this.video_containers = [];
    }

    playVideo() {
      this.refs.vidRef.play();
    }

    fetchPhoto = (photo_url, submission_id, filename) => {
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
    }

    fetchLog = (file_url, submission_id, filename) => {
      fetch(file_url + submission_id + '/' + filename).then(response => {
          return response.blob();
      })
      .then(file_blob => {
          var reader = new FileReader();
          reader.addEventListener("loadend", function() {
             this.setState({
               system_logs : reader.result
             });
          }.bind(this));
          reader.readAsText(file_blob);
      })
    }

    fetchVideo = (video_url, submission_id, filename) => {
      fetch(video_url + submission_id + '/' + filename).then(response => {
          return response.blob();
      })
      .then(blob => {
          var video_blob = new Blob([blob], {type: 'video/mp4'})
          console.log(video_blob);
          var objectURL = URL.createObjectURL(video_blob);
          console.log(objectURL);
          this.video_containers.push(
              <div key={filename} className="col-lg-3 col-md-4 col-xs-6">
                  <ReactPlayer url={objectURL} controls/>
              </div>
          );
      })
    }

    fetchFiles = () => {
        const meta_data_url = base_url + '/api/file/meta/';
        fetch(meta_data_url + this.submission.submission_id).then(response => {
            return response.json()
        }).then(submission_files => {

            const file_url = base_url + '/api/file/';
            submission_files.forEach(submission_file => {
                const submission_id = this.submission.submission_id;
                const filename = submission_file.file.filename;
                const file_type = submission_file.submission_type;
                switch(file_type) {
                  case 'SystemLog':
                    this.fetchLog(file_url, submission_id, filename)
                    break;
                  case 'Video':
                    console.log("Received video")
                    this.fetchVideo(file_url, submission_id, filename)
                    break;
                  case 'Photo':
                    this.fetchPhoto(file_url, submission_id, filename)
                    break;
                  default:
                    ("Unknown file type: " + file_type)
                    break;
                }
            });
        }).catch(error => {

        });
    }

    componentDidMount = () => {
        this.fetchFiles();
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

    handleChange = (event) => {
      this.setState({tagToAdd : event.target.value})
    }

    addTag = () => {
      const updated_tags = this.state.tags.concat([this.state.tagToAdd]);
      this.setState({
        tags : updated_tags
      })
      this.updateTags(updated_tags);
    }

    updateTags = (tags) => {
      const tagging_url = base_url + '/api/submission/tags'
      const data = { tags : tags };
      // console.log(this.state.tags);
      const opts = {
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body : JSON.stringify(data)
      }
      fetch(tagging_url + '/' + this.submission.submission_id, opts)
      .then(response => {
        return response.json()
      }).then(submission => {
        this.setState({
          tags : submission.tags,
        });
      })
      .catch(error => {
        console.error(error);
      })
    }


    removeTag = (tag_to_remove) => {
      var tags = this.state.tags.slice();
      var index = tags.indexOf(tag_to_remove);
      if (index > -1) {
        tags.splice(index, 1);
      }
      var new_state = { tags : tags }
      console.log(new_state)
      this.setState(new_state);
      console.log(this.state.tags)
      this.updateTags(tags);
    }

    getTagElements = () => {
      var tagElements = [];
      this.state.tags.forEach((tag) => {
        tagElements.push(
          <Badge key={tag} onClick={() => this.removeTag(tag)}>{tag}</Badge>
        );
      });
      return tagElements;
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
                            <strong>User: </strong>{(this.submission.user === 'null') ? "George P. Burdell" : this.submission.user }<br/>
                            <strong>MongoID: </strong>{this.submission._id}<br/>
                            <strong>Submission GUID: </strong>{this.submission.submission_id}<br/>
                            <strong>Submission Date: </strong>{new Date(this.submission.datetime).toGMTString()}<br/>
                            <strong>Tags: </strong> {this.getTagElements()}<br/>
                            <input type='text' value={this.state.tagToAdd} onChange={this.handleChange}/>{' '}<Button onClick={this.addTag}>Add Tag</Button>
                        </p>
                    </div>
                    <div>
                      <Map center={this.state.location} zoom={this.state.zoom}>
                      <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={default_position}>
                        <Popup>
                          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                        </Popup>
                      </Marker>
                      </Map>
                    </div><br/>
                    <Tabs defaultactiveket={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Messages">
                            <div>
                            <h3><span className="fa fa-envelope"></span> Messages </h3>
                            <hr/>
                            {this.getChatLogViews()}
                        </div>
                        </Tab>
                        <Tab eventKey={2} title="Pictures">
                            <div>
                                <h3><span className="fa fa-picture-o"></span> Photos </h3>
                                <div className="container">
                                    <div className="row text-center text-lg-left">
                                        {this.photo_containers}
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={3} title="Videos">
                            <div>
                                <h3><span className="fa fa-picture-o"></span> Videos </h3>
                                <div className="container">
                                    <div className="row text-center text-lg-left">
                                        {this.video_containers}
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={4} title="Metadata">
                            <div>
                                <h3><span className="fa fa-file-text"></span> Metadata</h3>
                                <div>
                                  <JSONPretty id="json-pretty"
                                      json={this.state.submission}>
                                  </JSONPretty>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={5} title="Logs">
                            <div>
                                <h3><span className="fa fa-file-text"></span> Logs</h3>
                                <div>
                                    {this.state.system_logs}
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
