import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

class HomePage extends Component {
  // IF user has login redirect to /forum
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/forum");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/forum");
    }
  }

  render() {
    return (
      <div className="container p-4">
        <div className="jumbotron">
          <h1 className="display-3">Join Us</h1>
          <p className="lead">Share your works and explore others</p>
          <hr className="my-2" />
          <p className="lead">
            <Link className="btn btn-success btn-lg" to="/forum">
              Explore
            </Link>
            &nbsp;
            <Link className="btn btn-primary btn-lg" to="/login">
              Sign In
            </Link>
          </p>
          <img
            src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="img-fluid"
            alt="Home"
          />
        </div>
      </div>
    );
  }
}

HomePage.prototypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  actLoginUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(HomePage));
