import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./index.css";

const Decision = () => {
  return (
    <Container fluid>
      <hr className="d-block bg-light my-4" />
      <Row>
        <Col>
          <h2 className="text-center text-white">which way this time?</h2>
        </Col>
      </Row>
      <hr className="d-block bg-light my-4" />
      <Row className="text-white">
        <Col sm="6">
          <Link to="/dashboard">
            <div className="bigBox">
              <p className="fullScreenFont text-right">
                MANAGE YOUR WORK IN THE STUDIO
              </p>
            </div>
          </Link>
        </Col>
        <Col sm="6">
          <Link to="/gallery">
            <div className="bigBox">
              <p className="fullScreenFont text-left">
                VIEW PUBLIC WORK IN THE GALLERY
              </p>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default Decision;
