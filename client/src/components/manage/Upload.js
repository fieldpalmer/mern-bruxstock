import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addFile, setFileLoading } from "../../redux/actions/fileActions";
import PropTypes from "prop-types";
import {
  Card,
  Col,
  Row,
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
    // window.setTimeout(window.location.reload(), 2 * 1000);
  };

  render() {
    const { title, notes, view, category } = this.state;

    return (
      <Row>
        <Col sm="12">
          <Card className="p-4">
            <h2>Upload File</h2>
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
                  <option value="drawing">Drawing</option>
                  <option value="painting">Painting</option>
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
          </Card>
        </Col>
      </Row>
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
