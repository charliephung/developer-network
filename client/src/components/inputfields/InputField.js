import React, { Component } from "react";
import PropTypes from "prop-types";

class InputField extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string,
    invalid: PropTypes.bool
  };
  static defaultProps = {
    type: "text",
    disabled: false,
    className: "form-control",
    invalid: false
  };

  render() {
    const {
      className,
      placeholder,
      type,
      name,
      value,
      onChange,
      disabled,
      id,
      icon,
      invalid
    } = this.props;
    return (
      <div>
        <div className="input-group mb-1">
          {icon ? (
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className={icon} />
              </span>
            </div>
          ) : (
            ""
          )}
          <input
            className={`${className} ${invalid ? "is-invalid" : ""}`}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            id={id}
          />
          <hr />
        </div>
      </div>
    );
  }
}

export default InputField;
