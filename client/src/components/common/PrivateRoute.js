import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (auth.isAuthenticated === true && !auth.user.verify) {
          return <Redirect to="/verify" />;
        }

        return auth.isAuthenticated === true ? (
          renderMergedProps(Component, routeProps, rest)
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
