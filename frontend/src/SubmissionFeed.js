import React, { Component } from 'react';
import {PageHeader, Button} from 'react-bootstrap'
import SubmissionDetailModal from './SubmissionDetailModal'

import config from './config.js';

export default class SubmissionFeed extends Component {

	constructor(props) {
		super(props);
		this.state = {
			submissions : [],
			showModal : false
		}
	}

	close = () => {
		this.setState({ showModal: false })
	}

	open = () => {
    	this.setState({ showModal: true });
  	}

	openSubmissionDetail = (submission) => {
		localStorage.setItem("submission", JSON.stringify(submission));
		this.props.history.push('/detail');
	}

	componentDidMount = () => {
		this.fetchSubmissions();
	}

	fetchSubmissions = () => {
		const url = config.base_url + '/api/submission'
		fetch(url)
		.then(results => {
			return results.json();
		})
		.then((submissions) => {
			this.setState({
				submissions : submissions
			})
		})
		.catch((error) => {
			console.error(error);
		});
	}

	removeId = (submission) => {
		var id = submission.submission_id;
		const url = config.base_url + '/api/submission/' + id;
		fetch(url, {method: 'DELETE'}).then(results => {
			this.fetchSubmissions()
		}).catch(error => {
			console.log(error)
		});
	}

	getTableRows = () => {
		const rows = [];
		this.state.submissions.forEach((submission) => {
			rows.push(
				<tr key={submission._id}>
					<td>{submission.user === 'null' ? "George P. Burdell" : submission.user}</td>
					<td>{submission.user === 'null' ? "gpburdell@gatech.edu" : submission.user}</td>
					<td>{submission.user === 'null' ? "Atlanta, GA" : submission.user}</td>
					<td>
					<SubmissionDetailModal
						showModal={this.state.showModal}
						close={this.close}
						submission={submission}/>
						<Button
							bsStyle="primary"
							onClick={() => {this.openSubmissionDetail(submission)}}>
							View Detail
						</Button>{' '}
						<Button
							bsStyle="warning"
							onClick={() => {this.removeId(submission)}}>
							Remove
						</Button>
					</td>
				</tr>
			)
		});
		return rows;
	};

    render() {
        return (
	        <div className="SubmissionFeed">
				<div className="container">
		            <PageHeader>Latest Submissions</PageHeader>
					<table className="table table-striped text-center">
						<thead>
							<tr>
								<th className="text-center">User</th>
								<th className="text-center">Email</th>
								<th className="text-center">Location</th>
								<th className="text-center">View Details</th>
							</tr>
						</thead>
						<tbody>
							{this.getTableRows()}
						</tbody>
					</table>
					<Button href='/profile'>Back to profile</Button>
					<Button>Export List</Button>
				</div>
			</div>
        );
    }
}
