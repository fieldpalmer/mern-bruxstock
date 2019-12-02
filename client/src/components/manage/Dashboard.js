import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import EditProfile from "../auth/EditProfile";
import UserInfoDisplay from "../common/UserInfoDisplay";
import Upload from "./Upload";
import Spreadsheet from "./Spreadsheet/Spreadsheet";
import {
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

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

  onEditProfClick = e => {
    e.preventDefault();
    // open edit user info modal
    // not currently set up as modal and shows nothing
    // either send to new page or pass openSesame prop
    return <EditProfile isOpen={true} />;
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container>
        <Row>
          <Col>
            <UserInfoDisplay user={user} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Row>
              <span>
                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Manage My Account
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={this.onEditProfClick}
                      className="text-warning"
                    >
                      Edit Profile
                    </DropdownItem>
                    <DropdownItem
                      onClick={this.onLogoutClick}
                      className="text-danger"
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </span>
              <span>
                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Manage My Files
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="text-success">
                      Upload New
                    </DropdownItem>
                    <DropdownItem className="text-warning">
                      Bulk Edit
                    </DropdownItem>
                    <DropdownItem className="text-info">
                      View Favorites
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </span>
            </Row>
            {/* <Edit Profile isOpen={true} /> */}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12" md="8">
            <Spreadsheet />
          </Col>
          <Col sm="12" md="4">
            <Upload />
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

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
