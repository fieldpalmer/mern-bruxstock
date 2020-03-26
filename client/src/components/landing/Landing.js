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
      <Container className="App">
        <Row className="fullScreen">
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <div className="bigBox">
              <p className="fullScreenFont">
                SAFELY STORE, ORGANIZE, and SHARE your WORK
              </p>
              <hr className="d-block bg-light my-4" />
              <Link to="/decision" style={{ textDecoration: "none" }}>
                <Button
                  size="lg"
                  outline
                  className="blueButton px-3 lead text-right"
                  block
                >
                  GET STARTED&nbsp;
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
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
