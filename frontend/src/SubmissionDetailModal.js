import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap'
import JSONPretty from 'react-json-pretty';

export default class SubmissionDetailModal extends Component {
    
	render() {
		return(
			<div>
				<Modal show={this.props.showModal} onHide={this.props.close}>
					<Modal.Header closeButton>
						<Modal.Title>Raw Submission Content</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div>
							<JSONPretty id="json-pretty"
                                json={this.props.submission}>
							</JSONPretty>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.props.close}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}
