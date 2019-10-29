import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
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
      isOpen: false,
      users: [],
      errors: {}
    };
  }

  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        let userNames = [];
        res.data.forEach(user => userNames.push(user.name + "~" + user._id));
        this.setState({ users: userNames });
      })
      .catch(error => {
        console.log(error);
      });
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

  getUsers = () => {
    return this.state.users.map((username, i) => {
      const name = username.split("~")[0];
      const id = username.split("~")[1];
      return (
        <DropdownItem key={i}>
          <Link to={`/portfolio/${id}`}>{name}</Link>
        </DropdownItem>
      );
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

                {/* this is gonna need to be it's own component */}
                {/* we need to get all users from db and map their 
                usernames as dropdown items */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Artists
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem disabled>View artist portfolios</DropdownItem>
                    <DropdownItem divider />
                    {this.getUsers()}
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
  { logoutUser }
)(withRouter(AppNavbar));
