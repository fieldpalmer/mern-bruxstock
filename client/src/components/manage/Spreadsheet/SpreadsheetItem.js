import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardImg,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Moment from "react-moment";

class SpreadsheetItem extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired
  };

  goToImage = () => {
    const { filename } = this.props.file;
    this.props.history.push(`/view/${filename}`);
  };

  render() {
    const {
      filename,
      title,
      notes,
      view,
      category,
      type,
      uploadDate,
      uploadedBy
    } = this.props.file;

    return (
      <tr>
        <td>
          <Card className="p-0 m-0">
            <CardImg
              top
              width="100%"
              src={`/api/files/${filename}`}
              alt="Card image cap"
            />
            <CardFooter>
              <Link
                to={{
                  pathname: `/view/${filename}`,
                  state: {
                    uploadedBy: uploadedBy
                  }
                }}
              >
                <Button color="success">View</Button>
              </Link>
              <Button disabled className="btn-warning" onClick={this.goToImage}>
                Edit
              </Button>
              <Button disabled className="btn-danger" onClick={this.goToImage}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        </td>
        <td>
          <ListGroup>
            <ListGroupItem>title: {title}</ListGroupItem>
            <ListGroupItem>notes: {notes}</ListGroupItem>
            <ListGroupItem>view: {view}</ListGroupItem>
            <ListGroupItem>category: {category}</ListGroupItem>
            <ListGroupItem>file type: {type}</ListGroupItem>
            <ListGroupItem>
              upload date:&nbsp;
              <Moment format="MM/DD/YYYY" date={{ uploadDate }} />
            </ListGroupItem>
          </ListGroup>
        </td>
      </tr>
    );
  }
}

export default withRouter(SpreadsheetItem);
