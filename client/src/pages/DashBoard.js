import React, { Component } from "react";
import PropTypes from "prop-types";
// Connect to store
import { connect } from "react-redux";
// Get link
import { Link } from "react-router-dom";
// Load actions
import * as ProfileActions from "../actions/actProfile";
// Load Spinner
import Spinner from "../components/common/Spinner";
// Validation
// load dashboard component
import DashBoardProfile from "../components/dashboard/DashBoardProfile";
import isEmpty from "../utils/isEmpty";

export class DashBoard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  // Get data
  componentWillMount() {
    this.props.actGetUserProfile();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile.profile,
      profiles: nextProps.profile.profiles,
      loading: nextProps.profile.loading
    });
  }

  onDeleteUserEducation = (id, history) => {
    this.props.actDeleteUserEducation(id, history);
  };
  onDeleteUserExperience = (id, history) => {
    this.props.actDeleteUserExperience(id, history);
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.state;
    let dashboardContent;

    if (!profile && loading) {
      dashboardContent = <Spinner />;
    } else {
      if (!isEmpty(profile)) {
        dashboardContent = (
          <DashBoardProfile
            history={this.props.history}
            profile={profile}
            onDeleteUserEducation={this.onDeleteUserEducation}
            onDeleteUserExperience={this.onDeleteUserExperience}
          />
        );
      } else {
        // User has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>Create your profile now to join our network</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        <h3>Dashboard</h3>
        {dashboardContent}
      </div>
    );
  }
}

DashBoard.prototypes = {
  actGetUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = {
  actGetUserProfile: ProfileActions.actGetUserProfile,
  actDeleteUserEducation: ProfileActions.actDeleteUserEducation,
  actDeleteUserExperience: ProfileActions.actDeleteUserExperience
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
