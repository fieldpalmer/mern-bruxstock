import React, { Component } from "react";
// import { Link } from "react-router-dom";

import GroupByCategory from "./GroupByCategory";
import CategorySort from "./CategorySort";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getFiles,
  setFileLoading,
  getCategories
} from "../../redux/actions/fileActions";
import { getArtists } from "../../redux/actions/authActions";
import { Container, Row, Col } from "reactstrap";

class Gallery extends Component {
  static propTypes = {
    getFiles: PropTypes.func.isRequired,
    getArtists: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    setFileLoading: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getFiles();
    this.props.getArtists();
    this.props.getCategories();
  };

  render() {
    const { files, categories } = this.props.files;

    return (
      <Container>
        <Row>
          <Col>
            <p className="display-4">La Galérie</p>
            {/* <p className="lead">
              Here you can see all works made publicly visible. Click the image
              to view it's page.
            </p>
            <p className="lead">
              If you want your work displayed in the gallery, you'll need to{" "}
              <Link to="/register">create an account</Link>{" "}
            </p>
            <p className="lead">
              If you're not quite ready to make your work public but still want
              to benefit from our sweet inventory management software, you
              should also <Link to="/register">create an account</Link>{" "}
            </p> */}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <CategorySort categories={categories} />
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
  files: state.files,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getFiles,
  getArtists,
  getCategories,
  setFileLoading
})(Gallery);
