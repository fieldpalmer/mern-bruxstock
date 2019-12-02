import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { PropTypes } from "prop-types";
// import { connect } from "react-redux";
// import logo from "../cormorant.png";
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardImg,
  CardBody,
  CardFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading
} from "reactstrap";

class Landing extends Component {
  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <p className="display-4">Bienvenue</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12" md="6">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <p className="lead">
              <strong>Beaux's Art</strong> is a place for artists to manage and
              promote their work.
            </p>
            <p className="lead">
              "Who's Beaux?" you may ask...well, you're Beaux, and if you know
              any French that also means y'all handsome so you're welcome.
            </p>
          </Col>
          <Col sm="12" md="6">
            <Card>
              <CardImg
                top
                width="100%"
                src="https://via.placeholder.com/150"
                alt="Card image cap"
              />
              <CardBody>
                <ListGroup>
                  <ListGroupItemHeading>
                    Perks of Membership
                  </ListGroupItemHeading>
                  <ListGroupItem>Store & Share Pieces</ListGroupItem>
                  <ListGroupItem>Discover Other Artists</ListGroupItem>
                  <ListGroupItem>Promote Yourself</ListGroupItem>
                </ListGroup>
              </CardBody>
              <CardFooter className="py-3">
                <Link to="/register">
                  <Button block>Create Account</Button>
                </Link>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12" md="6">
            <p className="lead">
              Beaux's Art is also a platform where individuals can gain
              inspiration and connect with artists for social or professional
              reasons.
            </p>
          </Col>
          <Col sm="12" md="6">
            <Card>
              <CardImg
                top
                width="100%"
                src="https://via.placeholder.com/150"
                alt="Card image cap"
              />
              <CardFooter className="py-3">
                <Link to="/gallery">
                  <Button block>View the Gallery</Button>
                </Link>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
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
