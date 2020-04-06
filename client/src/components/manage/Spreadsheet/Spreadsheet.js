import React from "react";
import SpreadsheetItem from "./SpreadsheetItem";
import { Card, CardColumns } from "reactstrap";
import "./index.css";

const Spreadsheet = props => {
  const { userFiles } = props;

  let spreadsheetItems;

  spreadsheetItems = userFiles.map(file => (
    <Card key={file._id}>
      <SpreadsheetItem file={file} />
    </Card>
  ));

  return <CardColumns>{spreadsheetItems}</CardColumns>;
};

export default Spreadsheet;
