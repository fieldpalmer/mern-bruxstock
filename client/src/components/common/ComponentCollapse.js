import React, { useState } from "react";
import { Collapse, Card, CardHeader } from "reactstrap";

const ComponentCollapse = props => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => setCollapse(!collapse);

  const { component, header } = props;

  return (
    <Card>
      <CardHeader onClick={toggle}>
        <h4>{header}</h4>
      </CardHeader>
      <Collapse isOpen={collapse}>{component}</Collapse>
    </Card>
  );
};

export default ComponentCollapse;
