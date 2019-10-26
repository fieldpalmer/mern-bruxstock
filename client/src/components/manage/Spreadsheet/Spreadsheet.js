import React, { Component } from "react";
import { connect } from "react-redux";
import { getFiles } from "../../../redux/actions/fileActions";
import PropTypes from "prop-types";
import SpreadsheetItem from "./SpreadsheetItem";
import { CardColumns } from "reactstrap";
import "./index.css";

class Spreadsheet extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    this.props.getFiles();
  };

  render() {
    const { files } = this.props.files;
    let userId = this.props.auth.user.id;

    let spreadsheetItems;

    spreadsheetItems = files.map(file =>
      file.uploadedBy === userId ? (
        <SpreadsheetItem key={file._id} file={file} />
      ) : null
    );

    return <CardColumns>{spreadsheetItems}</CardColumns>;
  }
}

const mapStateToProps = state => ({
  files: state.files,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getFiles }
)(Spreadsheet);
