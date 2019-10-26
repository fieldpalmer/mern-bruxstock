import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
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
  Container,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
// import { connect } from "react-redux";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      users: []
      // errors: {}
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
        res.data.map(user => userNames.push(user.name));
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
      return <DropdownItem key={i}>{username}</DropdownItem>;
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
                {/* this is gonna need to be it's own component */}
                {/* we need to get all users from db and map their 
                usernames as dropdown items */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Portfolios
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem disabled>Select an Artist</DropdownItem>
                    <DropdownItem divider />
                    {this.getUsers()}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="/gallery">Gallery</NavLink>
                </NavItem>
                {isAuthenticated ? (
                  <Button color="danger" size="sm" onClick={this.onLogoutClick}>
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
