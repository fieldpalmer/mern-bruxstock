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
      <Container fluid className="App" style={{ minHeight: "75vh" }}>
        <hr className="d-block bg-light mb-4" />

        <Row className="fullScreen">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <div className="bigBox">
              <p className="fullScreenFont">
                SAFELY STORE, ORGANIZE, AND SHARE YOUR WORK
              </p>
              <hr className="d-flex bg-light my-4" />
              <Link to="/decision" style={{ textDecoration: "none" }}>
                <Button
                  // size="lg"
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
