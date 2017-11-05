import React, { Component } from 'react';
import {PageHeader} from 'react-bootstrap'
import Submission from './Submission'

const url = 'http://localhost:3000/api/submission';

function SubmissionList(submissions) {
	const submissionItems = submissions.map((submission) =>
		<Submission submission={submission}/>
	);
	return (
		<div>
			{submissionItems}
		</div>
	);
}

class SubmissionFeed extends Component {

	constructor(props) {
		super(props);
		this.state = {
			submissions : []
		}
	}

	componentDidMount() {
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

    render() {
        return (
	        <div className="Submission">
	            <PageHeader>Latest Submissions</PageHeader>
	            {SubmissionList(this.state.submissions)}
	      	</div>        
        );
    }
}

export default SubmissionFeed;