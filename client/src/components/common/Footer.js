import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { Nav, NavItem, NavLink } from "reactstrap";

class Footer extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <footer className="page-footer font-small text-white mt-2 fixed-bottom">
        {/* <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h4 className="text-uppercase">Beaux's Art Collective</h4>
              <p>
                manage and promote your work without throwing it to the wolves
              </p>
            </div>
            <Nav className="m-auto" navbar>
              <NavItem>
                <NavLink className="text-info" href="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem onClick={() => window.alert("Call Field")}>
                <NavLink className="text-info" href="/">
                  Contact
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </div> */}

        <div className="footer-copyright text-center mt-3 py-3 small">
          © 2020 | BRXTK LLC
        </div>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Footer));
