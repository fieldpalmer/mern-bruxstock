import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editUser } from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class EditProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      displayName: "",
      location: "",
      specialties: "",
      email: "",
      isOpen: false,
      // password: "",
      // password2: "",
      errors: {}
    };
  }

  static propTypes = {
    editUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    let currentUser = this.props.auth.user;
    // need to get all other details of current user
    const { displayName } = currentUser;
    this.setState({ displayName: displayName, isOpen: this.props.isOpen });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let formData = new FormData();

    const { name, displayName, location, specialties, email } = this.state;

    const userData = {
      name,
      displayName,
      location,
      specialties,
      email
    };

    let formValuesStr = JSON.stringify(userData);
    formData.append("body", formValuesStr);
    // switch isOpen
    this.props.editUser(formData, this.props.history);
  };

  render() {
    return (
      <div>
        <Form className="form" noValidate onSubmit={this.onSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="name"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="your name please"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              type="name"
              name="displayName"
              id="displayName"
              value={this.state.displayName}
              onChange={this.onChange}
              placeholder="how you want your name to appear"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder={
                this.state.email ? this.state.email : "email@email.com"
              }
            />
          </FormGroup>
          <hr />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editUser }
)(withRouter(EditProfile));
