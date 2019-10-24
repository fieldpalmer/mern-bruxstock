import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  CardImg
} from "reactstrap";

class GalleryItem extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired
  };

  goToImage = () => {
    const { filename } = this.props.file;
    this.props.history.push(`/view/${filename}`);
  };

  render() {
    const { filename, uploadedBy, title, notes, category } = this.props.file;

    return (
      <Card>
        <CardImg
          top
          width="100%"
          src={`/api/files/${filename}`}
          alt="Card image cap"
        />
        <CardBody>
          <Link
            to={{
              pathname: `/view/${filename}`,
              state: {
                uploadedBy: uploadedBy,
                title: title,
                notes: notes,
                category: category
              }
            }}
          >
            <Button color="success">Go to Image</Button>
          </Link>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(GalleryItem);
