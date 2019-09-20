import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addFile, setFileLoading } from "../../redux/actions/fileActions";
import PropTypes from "prop-types";
import {
  Container,
  // CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

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
      view: "public",
      errors: {}
    };
  }

  static propTypes = {
    addFile: PropTypes.func.isRequired,
    setFileLoading: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  // might want to send file to GFS here??
  onFileSelect = e => {
    const file = e.target.files[0];
    // const { name, type } = file;
    const uploadedBy = this.props.auth.user.id;

    console.log(file);

    this.setState({ file, uploadedBy });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { file, notes, title, category, view, uploadedBy } = this.state;

    let formData = new FormData();

    const fileData = {
      uploadedBy: uploadedBy,
      title: title,
      notes: notes,
      category: category,
      view: view
    };

    let formValuesStr = JSON.stringify(fileData);
    // let formValuesPar = JSON.parse(formValuesStr);

    formData.append("file", file);
    formData.append("body", formValuesStr);
    // formData.push(fileData);

    this.props.addFile(formData);
  };

  render() {
    const { title, notes, view, category } = this.state;

    return (
      <Container>
        <h2>Upload File</h2>
        <hr />
        <Form
          onSubmit={this.onSubmit}
          encType="multipart/form-data"
          method="POST"
        >
          <FormGroup>
            <Label htmlFor="file">Select File</Label>
            <input
              type="file"
              id="file"
              name="file"
              // value={file}
              onChange={this.onFileSelect}
            />
          </FormGroup>

          {/* UPLOAD TITLE SECTION */}

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

          {/* UPLOAD NOTES SECTION */}

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

          {/* UPLOAD TYPE SELECTION */}

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
              <option value="drawing">Drawing</option>
              <option value="painting">Painting</option>
              <option value="addNewType">Add New Type</option>
            </Input>
          </FormGroup>

          {/* PUBLIC OR PRIVATE SELECTION */}
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addFile, setFileLoading }
)(withRouter(Upload));
