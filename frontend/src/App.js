import React, { Component } from 'react';
import { Grid, Col, Row} from 'react-bootstrap';
import SubmissionFeed from './SubmissionFeed'
import CaseFeed from './CaseFeed'
import Submitters from './Submitters'
import Officers from './Officers'
import Header from './Header'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div id="content">
          <Grid>
            <Row className="show-grid">
             <Col xs={6} md={2}>
                <CaseFeed/>
                <Submitters/>
                <Officers/>
             </Col>

             <Col xs={6} md={8}>
              <SubmissionFeed/>
             </Col>

             <Col xs={6} md={2}>
             </Col>
             
             </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
