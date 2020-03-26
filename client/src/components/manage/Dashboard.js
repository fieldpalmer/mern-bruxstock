import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import Upload from "./Upload";
import Spreadsheet from "./Spreadsheet/Spreadsheet";
import ComponentModal from "../common/ComponentModal";
import DataDropdown from "../common/DataDropdown";
import { Container, Row, Col, Button } from "reactstrap";
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

  goToPortfolio = () => {
    this.props.history.push(`/portfolio/${this.props.auth.user.id}`);
  };

  componentDidMount = () => {
    this.props.getFiles();
    this.props.getArtists();
    this.props.getCategories();
  };

  // prolly the move
  // filterByType = (type) => {
  //   let files = this.props.files;
  //   filter now
  // }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { files, categories } = this.props.files;

    // not the move
    const filterDisplay = filter => {
      if (filter && files) {
        console.log(filter);
        console.log(files);

        // return true;
      } else {
        console.log("problemz");
      }
    };

    return (
      <Container>
        <Row>
          <Col sm="12" md="4" className="text-white">
            <h2>Hello, {user.displayName}</h2>

            <hr className="bg-white" />
            <Button onClick={this.goToPortfolio} size="sm" block>
              Go to Your Portfolio
            </Button>
            <hr className="bg-white" />
            <ComponentModal
              component={<Upload />}
              buttonLabel="Add Something New"
            />
          </Col>
          <Col sm="12" md="8">
            <hr className="bg-white" />
            <Row>
              <Col sm="12" md="3">
                <p className="text-white text-center">
                  Filter By: <small>(not working)</small>
                </p>
              </Col>
              <Col sm="12" md="3">
                <DataDropdown
                  filterSet={categories}
                  filter={`Type`}
                  filterFunc={filterDisplay}
                />
              </Col>
              <Col sm="12" md="3">
                <DataDropdown
                  filterSet={files}
                  filter={`Date`}
                  filterFunc={filterDisplay}
                />
              </Col>
              <Col sm="12" md="3">
                <DataDropdown
                  filterSet={files}
                  filter={`View`}
                  filterFunc={filterDisplay}
                />
              </Col>
            </Row>
            <hr className="bg-white" />
            <Row>
              <Spreadsheet />
            </Row>
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
