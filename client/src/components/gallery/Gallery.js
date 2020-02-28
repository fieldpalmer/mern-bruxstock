import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import GroupByCategory from "./GroupByCategory";
import GalleryItem from "./GalleryItem";
// import CategorySort from "./CategorySort";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getFiles,
  setFileLoading,
  getCategories
} from "../../redux/actions/fileActions";
import { getArtists } from "../../redux/actions/authActions";
import { Container, Row, Col, CardColumns } from "reactstrap";

class Gallery extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    getArtists: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    setFileLoading: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getFiles();
    this.props.getArtists();
    this.props.getCategories();
  };

  render() {
    const { files, categories } = this.props.files;

    return (
      <Container>
        <Row>
          <Col>
            {/* <CategorySort categories={categories} /> */}
            <CardColumns>
              {files ? (
                // <GroupByCategory files={files} categories={categories} />
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
