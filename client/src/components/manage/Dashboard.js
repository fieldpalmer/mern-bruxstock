import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import Upload from "./Upload";
import Spreadsheet from "./Spreadsheet/Spreadsheet";
import ComponentCollapse from "../common/ComponentCollapse";
import { Container, Row, Col } from "reactstrap";

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container>
        <Row>
          <Col>
            <p className="lead">Hello, {user.displayName}!</p>
            <h3>This is Your Dashboard</h3>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12" md="8">
            <ComponentCollapse
              component={<Spreadsheet />}
              header="Manage Your Work"
            />
          </Col>
          <Col sm="12" md="4">
            <ComponentCollapse
              component={<Upload />}
              header="Upload New File"
            />
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
