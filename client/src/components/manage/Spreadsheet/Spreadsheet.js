import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { getFiles } from "../../../redux/actions/fileActions";
import PropTypes from "prop-types";
import SpreadsheetItem from "./SpreadsheetItem";
import "./index.css";

class Spreadsheet extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired
  };

  // style value to set table to max height and scroll image table
  componentDidMount = () => {
    this.props.getFiles();
  };

  render() {
    const { files } = this.props.files;

    let spreadsheetItems;

    spreadsheetItems = files.map(file => (
      <SpreadsheetItem key={file._id} file={file} />
    ));

    return (
      <div id="spreadsheet">
        <Table striped>
          <thead>
            <h4>My Files</h4>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>{spreadsheetItems}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files
});

export default connect(
  mapStateToProps,
  { getFiles }
)(Spreadsheet);
