import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Load action
import * as ProfileActions from "../actions/actProfile";
// load spinner
import Spinner from "../components/common/Spinner";
// load profile card
import ProfileCard from "../components/profile/ProfileCard";
// isempy
import isEmpty from "../utils/isEmpty";

export class ProfilesPage extends Component {
  static propTypes = {
    actSetProfileLoading: PropTypes.func.isRequired,
    actGetAllProfiles: PropTypes.func.isRequired,
    profiles: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actGetAllProfiles();
  }

  render() {
    const { profiles, loading } = this.props;

    let profilesContent;
    if (isEmpty(profiles.profiles) && profiles.loading) {
      profilesContent = <Spinner />;
    } else {
      if (!isEmpty(profiles.profiles) && !loading) {
        let result;
        result = profiles.profiles.map(ele => {
          return <ProfileCard key={ele._id} user={ele.user} profile={ele} />;
        });

        profilesContent = (
          <div className="my-card">
            <small className="text-muted pl-3">{`Showing ${
              result.length
            } results`}</small>
            <br />
            {result}
          </div>
        );
      } else {
        profilesContent = <h2>There are no profiles</h2>;
      }
    }

    return (
      <React.Fragment>
        <h1>Profiles</h1>
        {profilesContent}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profile
});

const mapDispatchToProps = {
  actSetProfileLoading: ProfileActions.actSetProfileLoading,
  actGetAllProfiles: ProfileActions.actGetAllProfiles
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesPage);
