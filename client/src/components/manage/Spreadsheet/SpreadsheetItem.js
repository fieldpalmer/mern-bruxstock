import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { CardBody, CardImg } from "reactstrap";
// import NotesCollapse from "./NotesCollapse";

class SpreadsheetItem extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired
  };

  render() {
    const {
      filename,
      title,
      notes,
      // view,
      category,
      // type,
      // gfsId,
      // uploadDate,
      uploadedBy
    } = this.props.file;

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
        {/* <NotesCollapse
          title={title}
          notes={notes}
          view={view}
          gfsId={gfsId}
          category={category}
          type={type}
          uploadDate={uploadDate}
        /> */}
      </CardBody>
    );
  }
}

export default withRouter(SpreadsheetItem);
