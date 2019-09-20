import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { PropTypes } from "prop-types";
// import { connect } from "react-redux";
// import logo from "../cormorant.png";
import { Container, Col, Row } from "reactstrap";

class Landing extends Component {
  render() {
    return (
      // Landing Page
      <div className="App">
        <Container>
          <Row>
            <Col>
              <h4>
                <code>BRUXSTOCK 2.0 COMING SOON</code>
              </h4>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <hr />
              <a
                className="App-link"
                href="https://bruxstock.herokuapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                view old site
              </a>{" "}
              <br />
              <Link to="/gallery">proceed to site in progress</Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// Landing.propTypes = {
//   auth: PropTypes.object.isRequired
//   // errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
//   // errors: state.errors
// });

// export default connect(mapStateToProps)(Landing);

export default Landing;
