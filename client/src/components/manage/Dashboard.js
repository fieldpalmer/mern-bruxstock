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
  getPrivateFilesByUser,
  setFileLoading,
  getCategories
} from "../../redux/actions/fileActions";

class Dashboard extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getPrivateFilesByUser: PropTypes.func.isRequired,
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
    this.props.getPrivateFilesByUser(this.props.auth.user.id);
    this.props.getCategories();
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { files, categories } = this.props.files;

    let userFiles = [];
    files.forEach(file => {
      if (file.uploadedBy === user.id) {
        userFiles.push(file);
      }
    });

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
            <hr className="bg-white" />

            <DataDropdown
              filterSet={categories}
              filter={`Filter by Category`}
            />
          </Col>
          <Col sm="12" md="8">
            <Row>
              <Spreadsheet userFiles={userFiles} />
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
  getPrivateFilesByUser,
  getCategories,
  setFileLoading
})(Dashboard);
