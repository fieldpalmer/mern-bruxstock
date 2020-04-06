import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import GroupByCategory from "./GroupByCategory";
import GalleryItem from "./GalleryItem";
import DataDropdown from "../common/DataDropdown";
// import CategorySort from "./CategorySort";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getFiles,
  setFileLoading,
  getCategories
} from "../../redux/actions/fileActions";
import { getArtists } from "../../redux/actions/authActions";
import { CardColumns, Container, Col, Row } from "reactstrap";

class Gallery extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    getArtists: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setFileLoading: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getFiles();
    this.props.getArtists();
    this.props.getCategories();
  };

  render() {
    const { files, categories } = this.props.files;
    const { users } = this.props.auth;

    return (
      <Container>
        <hr className="bg-white" />

        <Row>
          <Col sm="12" md="6">
            <h1 className="display-4 text-white">GALLERY</h1>
          </Col>

          <Col sm="12" md="6">
            <DataDropdown filterSet={users} filter={`Filter by Artist`} />
            <DataDropdown
              filterSet={categories}
              filter={`Filter by Category`}
            />
          </Col>
          {/* <Col sm="12" md="2">
            <DataDropdown filterSet={files} filter={`Date`} />
          </Col> */}
        </Row>
        <hr className="bg-white" />
        <Row>
          <Col>
            <Container fluid>
              <CardColumns>
                {files ? (
                  files.map(file =>
                    file.view === "public" ? (
                      <GalleryItem key={file._id} file={file} />
                    ) : null
                  )
                ) : (
                  <h1>
                    Doesn't look like we were able to find anything in the
                    database
                  </h1>
                )}
              </CardColumns>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getFiles,
  getArtists,
  getCategories,
  setFileLoading
})(Gallery);
