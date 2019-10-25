import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
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
      <Container>
        <Row className="my-3">
          <Col>
            <Card className="p-0 mb-2">
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
                <CardImg
                  top
                  width="100%"
                  src={`/api/files/${filename}`}
                  alt="Card image cap"
                />
              </Link>
            </Card>
            {/* <hr /> */}
          </Col>
          <Col>
            <ListGroup>
              <ListGroupItem className="py-1">
                <small>title:</small>&nbsp;{title}
              </ListGroupItem>
              <ListGroupItem className="py-1">
                <small>notes:</small>&nbsp;{notes}
              </ListGroupItem>
              <ListGroupItem className="py-1">
                <small>view:</small>&nbsp;{view}
              </ListGroupItem>
              <ListGroupItem className="py-1">
                <small>category:</small>&nbsp;{category}
              </ListGroupItem>
              <ListGroupItem className="py-1">
                <small>type:</small>&nbsp;{type}
              </ListGroupItem>
              <ListGroupItem className="py-1">
                <small>upload date:</small>&nbsp;
                <Moment format="MM/DD/YYYY">{uploadDate}</Moment>
              </ListGroupItem>
              <ListGroupItem className="p-2">
                <Button
                  disabled
                  block
                  outline
                  color="warning"
                  size="sm"
                  onClick={this.goToImage}
                >
                  edit image
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SpreadsheetItem);
