import React, { Component } from "react";
import GalleryItem from "../gallery/GalleryItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getFiles,
  getUserFiles,
  setFileLoading
} from "../../redux/actions/fileActions";
import { Container, CardColumns } from "reactstrap";

class Portfolio extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    getUserFiles: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    setFileLoading: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getFiles();
  }

  // Future Update: use onLoad event to smooth image loading

  render() {
    const { files } = this.props.files;

    let galleryItems;

    galleryItems = files.map(file => (
      <GalleryItem key={file._id} file={file} />
    ));

    return (
      <Container>
        <h2>This is the portfolio</h2>
        <hr />
        {files ? (
          <CardColumns>{galleryItems}</CardColumns>
        ) : (
          <div>
            <h1>
              Doesn't look like we were able to find anything in the database
            </h1>
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files
});

export default connect(
  mapStateToProps,
  { getFiles, getUserFiles, setFileLoading }
)(Portfolio);
