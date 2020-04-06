import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { CardBody, CardImg } from "reactstrap";
import "./index.css";

class SpreadsheetItem extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired
  };

  render() {
    const { filename, title, notes, category, uploadedBy } = this.props.file;

    return (
      <CardBody className="p-0">
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
      </CardBody>
    );
  }
}

export default withRouter(SpreadsheetItem);
