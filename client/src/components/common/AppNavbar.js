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
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getArtists: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getArtists();
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  showArtists = () => {
    return this.props.auth.users.map((user, i) => {
      const { name, _id, stock } = user;
      return stock.length > 0 ? (
        <DropdownItem key={i}>
          <Link to={`/portfolio/${_id}`}>{name}</Link>
        </DropdownItem>
      ) : null;
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
                    <NavLink href="/dashboard">My Dashboard</NavLink>
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

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Artists
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem disabled>View artist portfolios</DropdownItem>
                    <DropdownItem divider />
                    {this.showArtists()}
                  </DropdownMenu>
                </UncontrolledDropdown>

                {isAuthenticated ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Account
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link to={`/portfolio/edit/${this.props.auth.user.id}`}>
                          Edit Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem
                        onClick={this.onLogoutClick}
                        className="text-danger"
                      >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
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
  { logoutUser, getArtists }
)(withRouter(AppNavbar));
