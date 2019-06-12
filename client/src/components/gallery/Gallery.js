import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { getFiles, setFileLoading } from "../../actions/fileActions";
import {
  Container,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardColumns,
  CardSubtitle,
  CardText,
  CardBody
} from "reactstrap";

class Gallery extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    setFileLoading: PropTypes.func.isRequired
    // isAuthenticated: PropTypes.bool
    // auth: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getFiles();
  }

  // componentWillReceiveProps() {
  //   this.props.setFileLoading();
  // }

  render() {
    const { files } = this.props.files;

    return (
      <Container>
        {files ? (
          <CardColumns>
            {files.map((file, index) => (
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={file.filename}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>${file.img_title}`}</CardTitle>
                  <CardSubtitle>${file.uploadDate}`}</CardSubtitle>
                  <CardText>${file.img_notes}`}</CardText>
                  <Button
                    href={`http://localhost:3000/api/files/${file.filename}`}
                  >
                    View Image
                  </Button>
                </CardBody>
              </Card>
            ))}
          </CardColumns>
        ) : (
          <div>
            <h1>How can you have any meat if you don't eat your pudding?</h1>
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files
  // errors: state.errors
});

export default connect(
  mapStateToProps,
  { getFiles, setFileLoading }
)(Gallery);
