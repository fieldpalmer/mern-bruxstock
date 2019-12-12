import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addFile,
  getCategories,
  setFileLoading
} from "../../redux/actions/fileActions";
import PropTypes from "prop-types";
import { CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";

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
      category: undefined,
      view: "public"
    };
  }

  static propTypes = {
    addFile: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    setFileLoading: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    this.props.getCategories();
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

  categorySelects = () => {
    return this.props.files.categories.map((cat, i) => {
      return (
        <option key={i} value={cat}>
          {cat}
        </option>
      );
    });
  };

  addNewCategory = () => {
    const newCat = window.prompt(
      "Enter the new category you need. Check typos and capitalization!",
      "New Category"
    );
    this.setState({
      category: newCat
    });
  };

  render() {
    const { title, notes, view, category } = this.state;
    const catSelects = this.categorySelects();

    return (
      <CardBody className="p-4">
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
              placeholder={`date: [Date] media:[Media]`}
            />
          </FormGroup>
          <FormGroup>
            <Label for="selectType">Category</Label>
            <Input
              type="select"
              name="category"
              id="category"
              value={category}
              onChange={this.onChange}
            >
              <option value="select">
                {category === undefined ||
                category === "choose from existing category"
                  ? "choose from existing category"
                  : category}
              </option>
              {catSelects}
            </Input>
            <p className="text-center mt-3">
              <small>--- OR ---</small>
            </p>
            <Button
              size="sm"
              outline
              color="info"
              block
              onClick={this.addNewCategory}
            >
              Start a New Category
            </Button>
          </FormGroup>
          <hr />
          <Button color="primary" type="submit" block>
            Submit
          </Button>
        </Form>
      </CardBody>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  files: state.files
});

export default connect(mapStateToProps, {
  addFile,
  setFileLoading,
  getCategories
})(withRouter(Upload));
