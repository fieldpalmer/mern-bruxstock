import React, { useState } from "react";
import {
  Collapse,
  Button,
  CardFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";

const NotesCollapse = props => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => setCollapse(!collapse);

  const { title, notes, view, category } = props;

  return (
    <CardFooter className="p-0 m-0">
      <Button block outline color="success" onClick={toggle}>
        view info
      </Button>
      <Collapse isOpen={collapse}>
        <ListGroup>
          <ListGroupItem className="py-1">title:&nbsp;{title}</ListGroupItem>
          <ListGroupItem className="py-1">notes:&nbsp;{notes}</ListGroupItem>
          <ListGroupItem className="py-1">view:&nbsp;{view}</ListGroupItem>
          <ListGroupItem className="py-1">
            category:&nbsp;{category}
          </ListGroupItem>
          {/* <ListGroupItem className="py-1">
          <Button
              block
              outline
              color="warning"
              // onClick={() => this.handleDelete(file.gfsId)}
            >
              edit image
            </Button
          </ListGroupItem> */}
        </ListGroup>
      </Collapse>
    </CardFooter>
  );
};

export default NotesCollapse;
