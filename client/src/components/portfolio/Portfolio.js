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
    // this isn't working
    // get userFiles should add an array of the user's public files to an array
    // could be from state or from db === already in state?
    this.props.getUserFiles();
  }

  render() {
    const { files } = this.props.files;

    let portfolioItems;

    portfolioItems = files.map(file => (
      <GalleryItem key={file._id} file={file} />
    ));

    return (
      <Container>
        <h2>This is the portfolio</h2>
        <hr />
        {files ? (
          <CardColumns>{portfolioItems}</CardColumns>
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
