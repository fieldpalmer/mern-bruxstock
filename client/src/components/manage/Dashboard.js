import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import Upload from "./Upload";
import Spreadsheet from "./Spreadsheet";
import { Container, Row, Col } from "reactstrap";

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container>
        <h4>
          <b>Hello,</b> {user.name}
        </h4>
        <hr />
        <Row>
          <Col sm="!2" md="6">
            <Upload />
          </Col>
          <Col sm="!2" md="6">
            <Spreadsheet />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
