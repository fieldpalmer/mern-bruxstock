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
  ListGroup,
  ListGroupItem
} from "reactstrap";

class Landing extends Component {
  render() {
    return (
      <Container className="App">
        {/* <Row>
          <Col>
            <p className="display-4">Bienvenue</p>
          </Col>
        </Row> */}
        <Row>
          <Col sm="12" md="6">
            <p className="display-4">Bienvenue Chez Beaux</p>
            <hr />
            <p className="lead">
              <strong>Beaux's Art Management & Promotion</strong> is a place to
              store and share artwork.
            </p>
            <p className="">
              You may ask yourself, <em>Who's Beaux?</em>...well, you're Beaux,
              and if you know any French that also means y'all handsome so
              you're welcome.
            </p>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="12" md="6">
            <Card className="m-2">
              <CardImg
                top
                width="100%"
                src="https://via.placeholder.com/150"
                alt="Card image cap"
              />
            </Card>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12" md="6">
            <Card>
              <CardBody>
                <ListGroup flush>
                  <ListGroupItem>
                    <p className="lead">Keep Track of Inventory</p>
                  </ListGroupItem>
                  <ListGroupItem>
                    <p className="lead">Showcase Your Work</p>
                  </ListGroupItem>
                  <ListGroupItem>
                    <p className="lead">Discover New Art</p>
                  </ListGroupItem>
                  <Link to="/register">
                    <Button size="lg" color="primary" block>
                      Create Your Account
                    </Button>
                  </Link>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12" md="6">
            <Card>
              <CardImg
                top
                width="100%"
                src="https://via.placeholder.com/150"
                alt="Card image cap"
              />
            </Card>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12" md="6">
            <Card>
              <CardBody>
                <p className="lead">
                  Beaux's Art is also a platform where individuals can gain
                  inspiration and connect with artists for social or
                  professional reasons.
                </p>
                <hr />
                <Link to="/gallery">
                  <Button size="lg" color="success" block>
                    Explore the Gallery
                  </Button>
                </Link>
              </CardBody>
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
