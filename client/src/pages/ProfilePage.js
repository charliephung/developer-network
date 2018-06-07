import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Link
import { Link } from "react-router-dom";
// action
import * as ProfileActions from "../actions/actProfile";
// isempty
import isEmpty from "../utils/isEmpty";
// Sub comp
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileAbout from "../components/profile/ProfileAbout";
import ProfileCreds from "../components/profile/ProfileCreds";
// Load spinner
import Spinner from "../components/common/Spinner";
// not found
import NotFoundPage from "./NotFoundPage";

export class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      loading: null
    };
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    actGetUserProfileByHandle: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.match && this.props.match.params) {
      this.props.actGetUserProfileByHandle(this.props.match.params.handle);
    }
  }
  //   When profile is fetched
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      const { loading, profile } = nextProps.profile;
      this.setState({ profile, loading });
    }

    // if (isEmpty(nextProps.profile.profile)) {
    //   this.props.history.push("/not-found");
    // }
  }

  render() {
    const { loading, profile } = this.state;

    let profileContent;
    if (loading && isEmpty(profile)) {
      profileContent = <Spinner />;
    } else {
      if (!loading && !isEmpty(profile)) {
        const {
          career,
          bio,
          education,
          experience,
          company,
          github,
          user,
          location,
          skills,
          website,
          social
        } = profile;

        profileContent = (
          <React.Fragment>
            <ProfileHeader
              user={user}
              social={social}
              location={location}
              career={career}
              website={website}
              company={company}
              github={github}
            />
            <ProfileAbout bio={bio} skills={skills} name={user.name} />
            <ProfileCreds education={education} experience={experience} />
          </React.Fragment>
        );
      }
      if (!loading && isEmpty(profile)) {
        profileContent = <NotFoundPage />;
      }
    }
    return (
      // <!-- Profile -->
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <Link to="/profiles" className="btn btn-dark mb-3 float-left">
                    Back To Profiles
                  </Link>
                </div>
                <div className="col-6" />
              </div>
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  actGetUserProfileByHandle: ProfileActions.actGetUserProfileByHandle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
