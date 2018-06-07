import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { actRegisterUser } from "../actions/actAuth";
import InputField from "../components/inputfields/InputField";
import PropTypes from "prop-types";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      error: {}
    };
  }

  // IF user has login redirect to /forum
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    this.setState({ errors: nextProps.errors });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const userData = {
      name,
      email,
      password,
      password2
    };
    this.props.actRegisterUser(userData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <legend>Sign Up</legend>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <InputField
            placeholder="Enter name"
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />
          {errors && errors.name ? (
            <p className="text-danger">{errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <InputField
            placeholder="Enter email"
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors && errors.email ? (
            <p className="text-danger">{errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <InputField
            placeholder="Enter Password"
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors && errors.password ? (
            <p className="text-danger">{errors.password}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <InputField
            placeholder="Retype Password"
            type="password"
            id="password2"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          {errors && errors.password2 ? (
            <p className="text-danger">{errors.password2}</p>
          ) : (
            ""
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    );
  }
}

RegisterPage.prototypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  actRegisterUser: PropTypes.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

const mapDispatchToProps = {
  actRegisterUser: actRegisterUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisterPage));
