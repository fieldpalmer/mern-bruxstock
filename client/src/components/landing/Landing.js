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
                A GREAT PLACE TO SEE, STORE & SHARE YOUR SH*T!{" "}
                <hr className="d-block d-md-none bg-light" />
                <Link to="/decision">
                  <Button size="lg" outline color="info">
                    <h4 className="px-3 text-right">
                      LET'S F'N GO&nbsp;
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </h4>
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
