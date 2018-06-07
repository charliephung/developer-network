import React, { Component } from "react";
import PropTypes from "prop-types";

export class OptionField extends Component {
  static propTypes = {
    options: PropTypes.array,
    outterClass: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    invalid: PropTypes.bool,
    value: PropTypes.string
  };
  static defaultProps = {
    options: [],
    className: "form-control",
    invalid: false
  };

  onShowOptions = options => {
    let result = [];
    result = options.map((ele, index) => {
      // If find default value
      return (
        <option key={index} value={ele.value}>
          {ele.label}
        </option>
      );
    });
    return result;
  };

  render() {
    const {
      className,
      id,
      children,
      onChange,
      name,
      invalid,
      value
    } = this.props;
    return (
      <select
        className={`${className}  ${invalid ? "is-invalid" : ""}`}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
      >
        {this.onShowOptions(children)}
      </select>
    );
  }
}

export default OptionField;
