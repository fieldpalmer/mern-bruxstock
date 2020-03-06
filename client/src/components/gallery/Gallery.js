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
    setFileLoading: PropTypes.func.isRequired
  };

  // none of these do anything lol
  componentDidMount = () => {
    this.props.getFiles();
    this.props.getArtists();
    this.props.getCategories();
  };

  render() {
    const { files, categories } = this.props.files;

    return (
      <Container fluid>
        <hr className="bg-white" />
        <Row>
          <Col sm="12" md="6">
            <p className="display-4 text-white">Bienvenue à la Galerie</p>
          </Col>
          <Col sm="12" md="2">
            <p className="lead text-white">Filter by:</p>
          </Col>
          <Col sm="12" md="2">
            <p className="lead text-white block">
              <DataDropdown filter={`Artists`} />
            </p>
          </Col>
          <Col sm="12" md="2">
            <p className="lead text-white block">
              <DataDropdown filter={`Categories`} />
            </p>
          </Col>
        </Row>
        <hr className="bg-white" />
        <Row>
          <Col>
            <Container>
              <CardColumns>
                {files ? (
                  files.map(file =>
                    file.view === "public" ? (
                      <GalleryItem key={file._id} file={file} />
                    ) : null
                  )
                ) : (
                  <div>
                    <h1>
                      Doesn't look like we were able to find anything in the
                      database
                    </h1>
                  </div>
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
