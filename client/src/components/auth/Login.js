import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { withRouter } from "react-router-dom";
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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.goToDashboard();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  goToDashboard = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
    window.setTimeout(this.goToDashboard, 1 * 1000);
  };

  render() {
    const { errors } = this.state;
    return (
      <Container>
        <Row>
          <Col sm="12" md="4">
            <Card className="p-4">
              <h2>Login</h2>
              <hr />
              <Form className="form" noValidate onSubmit={this.onSubmit}>
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
                      invalid: errors.email || errors.emailnotfound
                    })}
                  />
                  {/* display errors if they exist */}
                  {errors.email || errors.emailnotfound ? (
                    <Alert color="danger">
                      {errors.email}
                      {errors.emailnotfound}
                    </Alert>
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
                    placeholder="enter password"
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                  />
                  {/* display errors if they exist */}
                  {errors.password || errors.passwordincorrect ? (
                    <Alert color="danger">
                      {errors.password}
                      {errors.passwordincorrect}
                    </Alert>
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
