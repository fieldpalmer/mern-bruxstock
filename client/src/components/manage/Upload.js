import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addFile,
  getFiles,
  setFileLoading
} from "../../redux/actions/fileActions";
import PropTypes from "prop-types";
import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";

class Upload extends Component {
  constructor(props) {
    super();
    this.state = {
      file: {},
      name: "",
      uploadedBy: props.auth.user.id,
      uploadDate: Date.now(),
      type: "",
      title: "",
      notes: "",
      category: "",
      categorySelects: [],
      view: "public",
      errors: {}
    };
  }

  static propTypes = {
    addFile: PropTypes.func.isRequired,
    getFiles: PropTypes.func.isRequired,
    setFileLoading: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
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
    const cats = Array.from(new Set(allCategories));
    cats.forEach(cat => {
      this.setState({
        categorySelects: this.state.categorySelects.push(cat)
      });
    });
  };

  onFileSelect = e => {
    const file = e.target.files[0];
    const uploadedBy = this.props.auth.user.id;
    this.setState({ file, uploadedBy });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    let formData = new FormData();

    const { file, notes, title, category, view, uploadedBy } = this.state;
    formData.append("file", file);

    const fileData = {
      uploadedBy: uploadedBy,
      title: title,
      notes: notes,
      category: category,
      view: view
    };

    let formValuesStr = JSON.stringify(fileData);
    formData.append("body", formValuesStr);

    this.props.addFile(formData, this.props.history);
  };

  render() {
    const { title, notes, view, category, categorySelects } = this.state;

    let catSelects = categorySelects.map((cat, i) => {
      return (
        <option key={i} value={cat}>
          {cat}
        </option>
      );
    });

    return (
      <Row className="mb-3">
        <Col sm="12">
          <h4>Upload File</h4>
          <hr />
          <Form
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
            method="POST"
          >
            <FormGroup>
              <input
                type="file"
                id="file"
                name="file"
                onChange={this.onFileSelect}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="notes">Notes</Label>
              <Input
                type="textarea"
                name="notes"
                id="notes"
                value={notes}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="selectType">Type</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={category}
                onChange={this.onChange}
              >
                <option value="select">Select</option>
                {catSelects}
                <option value="addNewType">Add New Type</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <FormGroup check inline>
                <Input
                  type="radio"
                  name="view"
                  value="public"
                  checked={view === "public"}
                  className="form-check-input"
                  onChange={this.onChange}
                />
                Public
              </FormGroup>
              <FormGroup check inline>
                <Input
                  type="radio"
                  name="view"
                  value="private"
                  checked={view === "private"}
                  className="form-check-input"
                  onChange={this.onChange}
                />
                Private
              </FormGroup>
            </FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  files: state.files
});

export default connect(
  mapStateToProps,
  { addFile, getFiles, setFileLoading }
)(withRouter(Upload));
