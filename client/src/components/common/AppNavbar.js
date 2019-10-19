import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
// import { connect } from "react-redux";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
      // errors: {}
    };
  }

  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Navbar expand="sm" className="mb-3">
          <Container>
            <NavbarBrand href="/gallery">BRXTK</NavbarBrand>
            <NavbarToggler color="dark" onClick={this.toggle}>
              X
            </NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? (
                  <NavItem>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                  </NavItem>
                ) : (
                  ""
                )}

                {isAuthenticated ? (
                  ""
                ) : (
                  <NavItem>
                    <NavLink href="/login">Login</NavLink>
                  </NavItem>
                )}
                {isAuthenticated ? (
                  ""
                ) : (
                  <NavItem>
                    <NavLink href="/register">Register</NavLink>
                  </NavItem>
                )}

                <NavItem>
                  <NavLink href="/gallery">Gallery</NavLink>
                </NavItem>
                {isAuthenticated ? (
                  <Button color="danger" onClick={this.onLogoutClick}>
                    Logout
                  </Button>
                ) : (
                  ""
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppNavbar);
