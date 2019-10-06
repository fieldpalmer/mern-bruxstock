import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button, Card, CardImg } from "reactstrap";

class SpreadsheetItem extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired
  };

  goToImage = () => {
    const { filename } = this.props.file;
    this.props.history.push(`/view/${filename}`);
  };

  render() {
    const { filename, title, notes, view } = this.props.file;

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
          </Card>
        </td>
        <td>
          {title}
          <br />
          <br />
          {notes}
          <br />
          <br />
          {view}
        </td>
        <td>
          <Button onClick={this.goToImage}>Go to Image</Button>
        </td>
      </tr>
    );
  }
}

export default withRouter(SpreadsheetItem);
