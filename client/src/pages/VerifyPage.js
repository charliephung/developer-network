import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Action
import * as AuthActions from "../actions/actAuth";

// isEmpty
import isEmpty from "../utils/isEmpty";

export class VerifyPage extends Component {
  static propTypes = {
    actVerifyUser: PropTypes.func.isRequired,
    actSendCode: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    this.state = {
      code: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.props.actSendCode();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      errors: nextProps.errors
    });
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.actVerifyUser(this.state.code, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="text-center">
          <h2>We sent a verify code to {this.props.auth.user.email}</h2>
          <h4>Please verify your account by enter the code below</h4>
          <h4 className="text-warning">
            You will be logout if the code is matched
          </h4>
          <input
            onChange={this.onChange}
            name="code"
            value={this.state.code}
            type="text"
            className={
              isEmpty(errors) ? "form-control" : "form-control is-invalid"
            }
          />
          {isEmpty(errors) ? null : (
            <small className="text-danger">{errors.msg}</small>
          )}
          <button className="btn mt-3 btn-block btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {
  actVerifyUser: AuthActions.actVerifyUser,
  actSendCode: AuthActions.actSendCode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VerifyPage));
