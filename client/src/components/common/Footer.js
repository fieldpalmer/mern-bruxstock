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
      <footer className="page-footer fixed-bottom font-small text-white mt-2 ">
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
