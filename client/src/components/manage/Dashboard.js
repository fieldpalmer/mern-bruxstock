import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import Upload from "./Upload";
import { Button, Card, Container } from "reactstrap";
class Dashboard extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container>
        <h4>
          <b>Hello,</b> {user.name}
        </h4>
        <hr />
        <Card className="py-3">
          <Upload />
        </Card>
        <hr />
        <Button color="danger" onClick={this.onLogoutClick}>
          Logout
        </Button>
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
