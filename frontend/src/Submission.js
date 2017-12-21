import React, {Component} from 'react';
import {Well, Button, Modal} from 'react-bootstrap'
import JSONPretty from 'react-json-pretty';

class Submission extends Component {

	constructor(props) {
		super(props);
		this.user = props.submission.user;
		this.messages = props.submission.content.messages;
		this.media = props.submission.content.media;
		this.state = {
			showModal : false
		}
	}

	close = () => {
		this.setState({ showModal: false })
	}

	open = () => {
    	this.setState({ showModal: true });
  	}

    render() {
        return (
	        <div className="Submission">
	            <Well>
	            	<Modal show={this.state.showModal} onHide={this.close}>
	            		<Modal.Header closeButton>
            				<Modal.Title>Raw Submission Content</Modal.Title>
          				</Modal.Header>
		    			<Modal.Body>
		    				<div>
		    					<JSONPretty id="json-pretty" json={this.props.submission}>

		    					</JSONPretty>
		    				</div>
		    			</Modal.Body>
		    			<Modal.Footer>
		            	<Button onClick={this.close}>Close</Button>
		          		</Modal.Footer>
    				</Modal>
		           	<p>
		           		<b>Case#:</b> 231456 <br/>
		           		<b>Submitter:</b> {this.user} <br/>
		           		<b>Contact:</b> 678-350-3466<br/>
		           		<b>Submission Content:</b> Messages({this.messages.length}), Multimedia({this.media.length}), Files(0), System Logs <br/>
		           		<b>Submission Date:</b> January 1st, 2017 <br/>
		           		<Button bsStyle="primary" onClick={this.open}>View Additional Content</Button>
		           	</p>
	            </Well>
	        </div>
        );
    }
}

export default Submission;
