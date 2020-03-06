import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import Upload from "./Upload";
import Spreadsheet from "./Spreadsheet/Spreadsheet";
import ComponentModal from "../common/ComponentModal";
import { Container, Row, Col } from "reactstrap";

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.auth.isAuthenticated
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container fluid>
        <Row>
          <Col className="text-white">
            <hr className="bg-white" />
            <p className="lead">Hello, {user.displayName}</p>
            <hr className="bg-white" />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="8">
            <Spreadsheet />
          </Col>
          <Col sm="12" md="4">
            <hr className="bg-white" />
            <ComponentModal
              component={<Upload />}
              buttonLabel="Add Something New"
            />
            <hr className="bg-white" />
            <ComponentModal
              component={<Upload />}
              buttonLabel="Manage En Masse"
            />
            <hr className="bg-white" />
            <ComponentModal
              component={<Upload />}
              buttonLabel="Update Profile"
            />
            <hr className="bg-white" />
            <ComponentModal
              component={<Upload />}
              buttonLabel="Upcoming Near You"
            />
            <hr className="bg-white" />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  files: state.files
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
