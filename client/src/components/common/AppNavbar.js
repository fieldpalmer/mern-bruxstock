import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { logoutUser, getArtists } from "../../redux/actions/authActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  // UncontrolledDropdown,
  DropdownItem
  // DropdownToggle,
  // DropdownMenu
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrow } from "@fortawesome/free-solid-svg-icons";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  static propTypes = {
    getArtists: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getArtists();
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  showArtists = () => {
    return this.props.auth.users.map((user, i) => {
      const { displayName, _id, stock } = user;

      return stock.length > 0 ? (
        <DropdownItem key={i}>
          <Link to={`/portfolio/${_id}`}>{displayName}</Link>
        </DropdownItem>
      ) : null;
    });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Navbar expand="sm" className="mb-3">
          <Container>
            <NavbarBrand style={{ color: "white" }} href="/">
              {/* Beaux's Art */}
              <FontAwesomeIcon icon={faCrow} />
              brxtk
            </NavbarBrand>
            <NavbarToggler color="dark" onClick={this.toggle}>
              X
            </NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? (
                  <NavItem>
                    <NavLink className="text-info" href="/dashboard">
                      Studio
                    </NavLink>
                  </NavItem>
                ) : (
                  ""
                )}

                {isAuthenticated ? (
                  ""
                ) : (
                  <NavItem>
                    <NavLink className="text-info" href="/login">
                      Login
                    </NavLink>
                  </NavItem>
                )}
                {isAuthenticated ? (
                  ""
                ) : (
                  <NavItem>
                    <NavLink className="text-info" href="/register">
                      Register
                    </NavLink>
                  </NavItem>
                )}

                <NavItem>
                  <NavLink className="text-info" href="/gallery">
                    Gallery
                  </NavLink>
                </NavItem>

                <NavItem onClick={() => window.alert("Call Field")}>
                  <NavLink className="text-info" href="/">
                    Contact
                  </NavLink>
                </NavItem>
                {/* <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="text-info">
                    Artists
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem disabled>View artist portfolios</DropdownItem>
                    <DropdownItem divider />
                    {this.showArtists()}
                  </DropdownMenu>
                </UncontrolledDropdown> */}

                {isAuthenticated ? (
                  <NavItem>
                    <NavLink
                      className="text-danger"
                      style={{ color: "white" }}
                      href="/"
                      onClick={this.onLogoutClick}
                    >
                      Logout
                    </NavLink>
                  </NavItem>
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

export default connect(mapStateToProps, { logoutUser, getArtists })(
  withRouter(AppNavbar)
);
