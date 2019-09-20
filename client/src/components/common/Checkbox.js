//checkbox component
import React, { Component } from "react";
import PropTypes from "prop-types";

export class Checkbox extends Component {
  static defaultProps = {
    checked: false
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
  };

  state = {
    checked: this.props.checked
  };

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    return (
      <span>
        <input
          type="checkbox"
          defaultChecked={this.state.checked}
          onChange={this.handleChange}
          id={this.props.id}
          name={this.props.name}
        />{" "}
        {this.props.label}
      </span>
    );
  }
}
