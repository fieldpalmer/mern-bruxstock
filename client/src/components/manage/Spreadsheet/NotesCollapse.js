import React, { useState } from "react";
import { Collapse, Button, ListGroup, ListGroupItem } from "reactstrap";
import Moment from "react-moment";

const NotesCollapse = props => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => setCollapse(!collapse);

  const { title, notes, view, category, type, uploadDate } = props;

  const goToImage = () => {
    const { filename } = this.props.file;
    this.props.history.push(`/view/${filename}`);
  };

  return (
    <div>
      <Button block outline color="success" onClick={toggle}>
        {title}
      </Button>
      <Collapse isOpen={collapse}>
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
              onClick={goToImage}
            >
              edit image
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Collapse>
    </div>
  );
};

export default NotesCollapse;
