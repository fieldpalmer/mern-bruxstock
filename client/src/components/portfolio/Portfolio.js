import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, CardColumns } from "reactstrap";

import { getFiles, setFileLoading } from "../../redux/actions/fileActions";
import GalleryItem from "../gallery/GalleryItem";

class Portfolio extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    setFileLoading: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getFiles();
  }

  render() {
    const { files } = this.props.files;
    const userId = this.props.match.params.userid;

    let userGallery = files.map(file =>
      file.uploadedBy === userId ? (
        <GalleryItem key={file._id} file={file} />
      ) : null
    );

    return (
      <Container>
        {files ? (
          <CardColumns>{userGallery}</CardColumns>
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
)(Portfolio);
