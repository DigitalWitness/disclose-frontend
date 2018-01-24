import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import SubmissionFeed from './SubmissionFeed'

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
             <div id="content">
                 <Grid>
                    <Row className="show-grid">
                        <Col xs={6} md={2}>

                        </Col>
                        <Col xs={6} md={8}>
                             <SubmissionFeed/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}
