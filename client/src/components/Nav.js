import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "../utils/isEmpty";
import * as Actions from "../actions/actAuth";
import * as ProfileActions from "../actions/actProfile";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// Load dropdown
import DropDown from "../components/common/DropDown";

class Nav extends Component {
  constructor() {
    super();

    // create ref for search bar to display dropdown list
    // in the right position
    this.search = React.createRef();

    this.state = {
      user: {},
      search: false,
      // dropdown style
      style: {}
    };
  }

  componentDidMount() {
    if (this.search.current) {
      this.setState({
        style: {
          backgroundColor: "#fff",
          top: this.search.current
            ? (this.search.current.offsetHeight + 5).toString() + "px"
            : "",
          width: this.search.current
            ? this.search.current.offsetWidth.toString() + "px"
            : "",
          position: "absolute",
          zIndex: "100",
          boxShadow: "1px 1px 1px 1px rgba(0,0,0,.1)"
        }
      });
    }
    if (this.props.auth.isAuthenticated) {
      this.setState({ user: this.props.auth.user });
    } else {
      this.setState({ user: {} });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({ user: nextProps.auth.user });
    } else {
      this.setState({ user: {} });
    }
  }

  onLogout = e => {
    e.preventDefault();
    this.props.actClearUserProfile();
    this.props.actLogoutUser(this.props.history);
  };

  // Show dropdown with focus input
  onShowDropDown = () => {
    this.setState({
      search: true
    });
  };
  onHideDropDown = () => {
    setTimeout(() => {
      this.setState({
        search: false
      });
    }, 200);
  };

  render() {
    const { user, search, style } = this.state;

    return (
      <nav id="my-nav" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          DevNetwork
        </Link>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/forum">
              Forum
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profiles">
              People
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {!isEmpty(user) ? (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <img
                  style={{ width: "25px", display: "inline-block" }}
                  src={user.avatar}
                  alt={user.name}
                />
                &nbsp;{user.name}
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Sign Up
              </Link>
            </li>
          )}
          {!isEmpty(user) ? (
            <li className="nav-item">
              <div onClick={this.onLogout} className="nav-link">
                Logout
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = {
  auth: PropTypes.object.isRequired,
  actLogoutUser: PropTypes.func.isRequired,
  actClearUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  actLogoutUser: Actions.actLogoutUser,
  actClearUserProfile: ProfileActions.actClearUserProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Nav));
