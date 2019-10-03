import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  CardImg
} from "reactstrap";

class SpreadsheetItem extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired
  };

  goToImage = () => {
    const { filename } = this.props.file;
    // need to dispatch redux action to set currentFile state
    // currentFile state really only needs to contain the uploadedBy info
    this.props.history.push(`/view/${filename}`);
  };

  render() {
    const { filename, uploadedBy, title, notes } = this.props.file;

    return (
      <Card>
        <CardImg
          top
          width="100%"
          src={`/api/files/${filename}`}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{notes}</CardText>
          <CardText>{uploadedBy}</CardText>
        </CardBody>
        <CardFooter>
          <Button onClick={this.goToImage}>View Image</Button>
        </CardFooter>
      </Card>
    );
  }
}

export default withRouter(SpreadsheetItem);
