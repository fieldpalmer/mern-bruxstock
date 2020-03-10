import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import Upload from "./Upload";
import Spreadsheet from "./Spreadsheet/Spreadsheet";
import ComponentModal from "../common/ComponentModal";
import DataDropdown from "../common/DataDropdown";
import { Container, Row, Col } from "reactstrap";
import {
  getFiles,
  setFileLoading,
  getCategories
} from "../../redux/actions/fileActions";
import { getArtists } from "../../redux/actions/authActions";
import Portfolio from "../portfolio/Portfolio";

class Dashboard extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getFiles: PropTypes.func.isRequired,
    getArtists: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setFileLoading: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.auth.isAuthenticated
    };
  }

  componentDidMount = () => {
    this.props.getFiles();
    this.props.getArtists();
    this.props.getCategories();
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { files, categories } = this.props.files;

    return (
      <Container fluid>
        <Row>
          <Col sm="12" className="text-white">
            <h2>Hello, {user.displayName}</h2>
            {/* <p className="lead d-none d-lg-block">
              We sincerely hope you enjoy this digital storage solution, and we
              welcome your your input on anything you'd like to see
            </p> */}
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="8">
            <hr className="bg-white" />
            <Row>
              {/* <Col sm="12" md="2" className="px-0 mx-0">
                <p className="text-white">Filtersort:</p>
              </Col> */}
              <Col sm="12" md="4">
                <DataDropdown filterSet={categories} filter={`Type`} />
              </Col>
              <Col sm="12" md="4">
                <DataDropdown filterSet={files} filter={`Date`} />
              </Col>
              <Col sm="12" md="4">
                <DataDropdown filterSet={files} filter={`View`} />
              </Col>
            </Row>
            <hr className="bg-white" />
            <Row>
              <Spreadsheet />
            </Row>
          </Col>
          <Col sm="12" md="4">
            <hr className="bg-white" />
            <ComponentModal
              component={<Upload />}
              buttonLabel="Add Something New"
            />
            {/* <hr className="bg-white" />
            <ComponentModal
              component={<Upload />}
              buttonLabel="Manage En Masse"
            /> */}
            <hr className="bg-white" />
            <ComponentModal
              component={<Portfolio />}
              buttonLabel="View Your Profile"
            />
            <hr className="bg-white" />
            <ComponentModal
              component={<Upload />}
              buttonLabel="Edit Personal Information"
            />
            <hr className="bg-white" />
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

export default connect(mapStateToProps, {
  logoutUser,
  getFiles,
  getArtists,
  getCategories,
  setFileLoading
})(Dashboard);
