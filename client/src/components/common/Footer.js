import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

class Footer extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <footer className="page-footer font-small pt-4">
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h4 className="text-uppercase">Beaux's Art</h4>
              <h5>Management & Promotion</h5>
              <p>Let us know of any glitches or suggestions</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-3" />
            <Nav className="m-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/gallery">Gallery</NavLink>
              </NavItem>
              {isAuthenticated ? (
                <NavItem>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              )}
              <NavItem onClick={() => window.alert("Call Field")}>
                <NavLink href="/">Contact</NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
        <hr className="clearfix w-100 d-md-none pt-3" />

        <div className="footer-copyright text-center mt-3 py-3">
          © 2019 Copyright: BRXTK LLC
        </div>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Footer));
