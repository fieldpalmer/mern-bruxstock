import React, { Component } from "react";
import GroupByCategory from "./GroupByCategory";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFiles, setFileLoading } from "../../redux/actions/fileActions";
import { Container, Row, Col } from "reactstrap";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    };
  }
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    setFileLoading: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getFiles();
  };

  getCategories = () => {
    const { files } = this.props.files;
    let allCategories = [];
    files.forEach(file => {
      allCategories.push(file.category);
    });
    return Array.from(new Set(allCategories));
  };

  render() {
    const { files } = this.props.files;
    const categories = this.getCategories();

    return (
      <Container>
        <Row>
          <Col>
            <p className="display-4">Welcome to the Gallery</p>
            <p className="lead">
              Here you can see everything grouped and sorted a number of ways.
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {files ? (
              <GroupByCategory files={files} categories={categories} />
            ) : (
              <div>
                <h1>
                  Doesn't look like we were able to find anything in the
                  database
                </h1>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files
});

export default connect(
  mapStateToProps,
  { getFiles, setFileLoading }
)(Gallery);
