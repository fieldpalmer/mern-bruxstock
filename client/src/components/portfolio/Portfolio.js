import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, CardColumns } from "reactstrap";

import {
  getFiles,
  setFileLoading,
  getCategories
} from "../../redux/actions/fileActions";
import { getArtists } from "../../redux/actions/authActions";
import GalleryItem from "../gallery/GalleryItem";

class Portfolio extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    getArtists: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    setFileLoading: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    this.props.getFiles();
    this.props.getArtists();
    this.props.getCategories();
  };

  matchUser = userId => {
    return this.props.auth.users.map((user, i) => {
      const { displayName, _id } = user;
      return _id === userId ? <p key={i}>{displayName}</p> : null;
    });
  };

  render() {
    const { files } = this.props.files;
    const userId = this.props.match.params.userid;
    const artistName = this.matchUser(userId);

    let userGallery = files.map(file =>
      file.uploadedBy === userId && file.view === "public" ? (
        <GalleryItem key={file._id} file={file} />
      ) : null
    );

    return (
      <Container className="text-white">
        <small>artist:</small>
        <strong>&nbsp;{artistName}</strong>
        <hr className="bg-white" />
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
  files: state.files,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getFiles,
  getArtists,
  getCategories,
  setFileLoading
})(Portfolio);
