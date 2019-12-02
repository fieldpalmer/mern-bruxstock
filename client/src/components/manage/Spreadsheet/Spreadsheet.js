import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getFiles } from "../../../redux/actions/fileActions";
import PropTypes from "prop-types";
import SpreadsheetItem from "./SpreadsheetItem";
import { CardColumns, Button, Card, CardFooter } from "reactstrap";
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

  handleDelete = gfsId => {
    axios.delete(`http://localhost:5000/api/files/delete/${gfsId}`).then(() => {
      window.location.reload();
    });
  };

  render() {
    const { files } = this.props.files;
    let userId = this.props.auth.user.id;

    let spreadsheetItems;

    spreadsheetItems = files.map(file =>
      file.uploadedBy === userId ? (
        <Card key={file._id} className="p-0 mb-2">
          <SpreadsheetItem file={file} />
          <CardFooter>
            <Button
              block
              outline
              color="warning"
              size="sm"
              // onClick={() => this.handleDelete(file.gfsId)}
            >
              edit image
            </Button>
          </CardFooter>
          <CardFooter>
            <Button
              block
              outline
              color="danger"
              size="sm"
              onClick={() => this.handleDelete(file.gfsId)}
            >
              delete image
            </Button>
          </CardFooter>
        </Card>
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
