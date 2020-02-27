import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { PropTypes } from "prop-types";
// import { connect } from "react-redux";
// import logo from "../cormorant.png";
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
                AN AWESOME PLACE TO SEE, STORE & SHARE YOUR SH!T{" "}
                <Link to="/dashboard">
                  <Button size="lg" color="success">
                    BEGIN
                  </Button>
                </Link>
              </p>
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
