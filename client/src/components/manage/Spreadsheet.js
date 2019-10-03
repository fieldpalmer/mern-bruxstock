import React, { Component } from "react";
import { Card, Table } from "reactstrap";
import { connect } from "react-redux";
import { getUserFiles } from "../../redux/actions/fileActions";
import PropTypes from "prop-types";
import SpreadsheetItem from "./SpreadsheetItem";

class Spreadsheet extends Component {
  static propTypes = {
    getUserFiles: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired
  };

  // style value to set table to max height and scroll image table
  componentDidMount = () => {
    this.props.getUserFiles();
  };

  render() {
    const { files } = this.props.files;

    let spreadsheetItems;

    spreadsheetItems = files.map(file => (
      <SpreadsheetItem key={file._id} file={file} />
    ));

    return (
      <Card className="p-4">
        <Table striped>
          <thead>
            <h4>My Files</h4>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Link</th>
              <th>Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            <row>{spreadsheetItems}</row>
          </tbody>
        </Table>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files
});

export default connect(
  mapStateToProps,
  { getUserFiles }
)(Spreadsheet);
