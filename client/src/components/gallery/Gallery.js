import React, { Component } from "react";
import GalleryItem from "./GalleryItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFiles, setFileLoading } from "../../redux/actions/fileActions";
import { Container, CardColumns } from "reactstrap";

class Gallery extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    setFileLoading: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getFiles();
  }

  render() {
    const { files } = this.props.files;

    let galleryItems = files.map(file => (
      <GalleryItem key={file._id} file={file} />
    ));

    return (
      <Container>
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
  { getFiles, setFileLoading }
)(Gallery);
