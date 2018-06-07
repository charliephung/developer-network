import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class DropDown extends Component {
  static propTypes = {
    style: PropTypes.object,
    onHideDropDown: PropTypes.func
  };

  static defaultProps = {
    style: {
      display: "none"
    }
  };

  onHideDropDown = () => {
    this.props.onHideDropDown();
  };
  render() {
    const { style } = this.props;

    return (
      <div style={style}>
        <h5 className="p-2 text-bold">Search for</h5>
        <ul className="pl-0 my-list">
          <Link to="/profiles" onClick={this.onHideDropDown}>
            <li className="list-item">
              <i className="fas fa-users pr-4" />
              Developers
            </li>
          </Link>
          <li className="list-item">
            <i className="far fa-newspaper pr-4" />
            Posts
          </li>
        </ul>
      </div>
    );
  }
}
