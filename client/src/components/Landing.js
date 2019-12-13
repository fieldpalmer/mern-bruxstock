import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { PropTypes } from "prop-types";
// import { connect } from "react-redux";
// import logo from "../cormorant.png";
import { Button, Container, Col, Row, Card, CardImg } from "reactstrap";
import { cpus } from "os";
import { createCipher } from "crypto";

class Landing extends Component {
  render() {
    return (
      <Container className="App">
        {/* welcome header */}
        <Row>
          <Col className="text-center" sm="12">
            <h1>BEAUX'S ART</h1>
            <h2>
              {/* <em>Management & Promotion</em> */}
              Management & Promotion
            </h2>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <em>
              <p className="lead">
                This website is intended to reduce the effort required by
                artists to manage and share their work. Beaux's mission is to
                give artists a convenient, secure, connected environment in
                which to process and promote their progress and their products.
              </p>
            </em>
          </Col>
        </Row>
        <hr />
        {/* dashboard teaser with register btn */}
        <Row className="my-2 p-4">
          <Col sm="12" md="6" className="my-auto">
            <Card>
              <CardImg
                top
                width="100%"
                src="https://cdn.pixabay.com/photo/2016/08/23/12/37/files-1614223_1280.jpg"
                alt="Card image cap"
              />
            </Card>
          </Col>
          <Col sm="12" md="6" className="my-auto">
            <div>
              <h1>
                <strong>Inventory</strong>
              </h1>
              <hr />

              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus eos quibusdam minima magnam assumenda voluptatibus
                quaerat!
              </p>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus eos inventore temporibus ratione labore expedita
                sapiente nesciunt quibusdam minima magnam assumenda voluptatibus
                quaerat!
              </p>
            </div>
            <hr />
            <Link to="/register">
              <Button size="lg" color="success" block>
                Create an Account to Begin
              </Button>
            </Link>
          </Col>
        </Row>
        <hr />
        {/* Artist Portfolio teaser section */}
        <Row className="my-2 p-4">
          <Col sm="12" md="6" className="my-auto">
            <h1>
              <strong>Portfolio</strong>
            </h1>
            <hr />

            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit, sapiente
              nesciunt quibusdam minima magnam assumenda voluptatibus labore
              expedita circumspectabat.
            </p>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus eos inventore minima magnam assumenda voluptatibus
              quaerat!
            </p>
            <hr />
            <Link to="/register">
              <Button size="lg" color="info" block>
                Create an Account to Begin
              </Button>
            </Link>
          </Col>
          <Col sm="12" md="6" className="my-auto">
            <Card>
              <CardImg
                top
                width="100%"
                src="https://cdn.pixabay.com/photo/2019/12/05/07/46/artist-4674492_960_720.png"
                alt="Card image cap"
              />
            </Card>
          </Col>
        </Row>
        <hr />
        {/* Gallery jumbotron with link */}
        <Row className="my-2 p-4">
          <Col sm="12" md="6" className="my-auto">
            <Card>
              <CardImg
                top
                width="100%"
                src="https://cdn.pixabay.com/photo/2014/12/09/21/01/still-life-562357_1280.jpg"
                alt="Card image cap"
              />
            </Card>
          </Col>
          <Col sm="12" md="6" className="my-auto">
            <div>
              <h1>
                <strong>Community</strong>
              </h1>
              <hr />

              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus eos quibusdam minima magnam assumenda voluptatibus
                quaerat!
              </p>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus minima magnam assumenda voluptatibus quaerat!
              </p>
            </div>
            <hr />
            <Link to="/gallery">
              <Button size="lg" color="warning" block>
                Explore the Gallery
              </Button>
            </Link>
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
