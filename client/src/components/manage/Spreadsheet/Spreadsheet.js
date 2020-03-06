import React, { Component } from "react";
import { connect } from "react-redux";
import { getFiles } from "../../../redux/actions/fileActions";
import PropTypes from "prop-types";
import SpreadsheetItem from "./SpreadsheetItem";
import { Card, CardBody, CardColumns, Button, CardFooter } from "reactstrap";
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
        <Card key={file._id} className="p-0 mb-2">
          <SpreadsheetItem file={file} />
          {/* <CardFooter>
            <Button
              block
              outline
              color="warning"
              // onClick={() => this.handleDelete(file.gfsId)}
            >
              edit image
            </Button>
          </CardFooter> */}
        </Card>
      ) : null
    );

    return (
      <CardBody>
        <CardColumns>{spreadsheetItems}</CardColumns>
      </CardBody>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files,
  auth: state.auth
});

export default connect(mapStateToProps, { getFiles })(Spreadsheet);
