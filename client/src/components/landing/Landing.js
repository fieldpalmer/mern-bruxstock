import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { PropTypes } from "prop-types";
// import { connect } from "react-redux";
// import logo from "../cormorant.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import { Button, Container, Col, Row } from "reactstrap";
import "./index.css";

class Landing extends Component {
  render() {
    return (
      <Container fluid className="App">
        <Row className="fullScreen">
          <Col sm="12">
            <div className="bigBox">
              <p className="fullScreenFont">
                AN EXCELLENT PLACE TO SEE, STORE, AND SHOW OFF YOUR SHIT*!{" "}
              </p>
              <hr className="d-block bg-light my-4" />
              <p className="small">
                * <strong>shit:</strong> as in, <em>that's my shit!</em> <br />
                This site is for all kinds of shit: it's for shit in the works;
                it's for shit ready to show off; it's for shit already selling.
                Mostly this site is to provide an alternative to the shit out
                there now: the shit that makes you sign away all rights and
                privileges to your work for their shit, but this shit ain't that
                shit! This shit is yours, so&nbsp;
                <strong>use it.</strong>
              </p>
              <hr className="d-block bg-light my-4" />
              <Link to="/decision">
                <Button size="lg" outline color="info" block>
                  <h4 className="px-3 text-right">
                    LET'S FUCKIN' GO THEN&nbsp;
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                  </h4>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">{/* login button */}</Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;
