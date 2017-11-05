import React, { Component } from 'react';
import { PageHeader} from 'react-bootstrap'

class CaseFeed extends Component {
    render() {
        return (
	        <div className='CaseFeed'>
	       		<PageHeader><small>Current Cases</small></PageHeader>
	        </div>        
        );
    }
}

export default CaseFeed;