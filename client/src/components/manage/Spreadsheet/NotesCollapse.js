import React, { useState } from "react";
import {
  Collapse,
  Button,
  CardFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Moment from "react-moment";
// import EditImage from "../EditImage";

const NotesCollapse = props => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => setCollapse(!collapse);

  const { title, notes, view, category, type, uploadDate, gfsId } = props;

  return (
    <CardFooter classNam="px-1">
      <Button block outline color="success" onClick={toggle}>
        view info
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
            <small>gfsId:</small>&nbsp;{gfsId}
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
        </ListGroup>
      </Collapse>
    </CardFooter>
  );
};

export default NotesCollapse;
