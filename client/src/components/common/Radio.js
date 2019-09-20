import React from "react";
import PropTypes from "prop-types";

//radio component
export class Radio extends React.Component {
  static defaultProps = {
    selected: false
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool
  };

  state = {
    selected: this.props.selected
  };

  handleChange = () => {
    this.setState({ selected: !this.state.selected });
  };

  render() {
    return (
      <span>
        <input
          type="radio"
          defaultChecked={this.state.selected}
          onChange={this.handleChange}
          id={this.props.id}
          name={this.props.name}
        />{" "}
        {this.props.label}
      </span>
    );
  }
}
