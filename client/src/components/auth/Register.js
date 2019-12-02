import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Alert,
  Card,
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      displayName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, displayName, email, password, password2 } = this.state;

    const newUser = {
      name,
      displayName,
      email,
      password,
      password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container>
        <Row>
          <Col sm="!@" md="4">
            <Card className="p-4">
              <h2>Register</h2>
              <hr />
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
                    error={errors.email}
                    placeholder="email@email.com"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  {/* display errors if they exist */}
                  {errors.email ? (
                    <Alert color="danger">{errors.email}</Alert>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    placeholder="enter a good password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                  {/* display errors if they exist */}
                  {errors.password ? (
                    <Alert color="danger">{errors.password}</Alert>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password2">Confirm Password</Label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    placeholder="confirm your password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  {/* display errors if they exist */}
                  {errors.password2 ? (
                    <Alert color="danger">{errors.password2}</Alert>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <hr />
                <Button type="submit">Submit</Button>
              </Form>
            </Card>
          </Col>
        </Row>
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
  { registerUser }
)(withRouter(Register));
