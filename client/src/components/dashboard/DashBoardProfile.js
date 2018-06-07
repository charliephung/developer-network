import React, { Component } from "react";
import PropTypes from "prop-types";
// Link
import { Link } from "react-router-dom";
// Social Link
import SocialLink from "../common/SocialLink";
// Education card
import EducationCard from "../dashboard/DashBoardEducation";
import ExperienceCard from "../dashboard/DashBoardExperience";
// isEmpty
import isEmpty from "../../utils/isEmpty";
export class DashBoardProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {
        career: "",
        education: [],
        experience: [],
        github: "",
        location: "",
        skills: [],
        user: "",
        website: "",
        bio: "",
        company: "",
        social: {}
      }
    };
  }
  static propTypes = {
    onDeleteUserEducation: PropTypes.func.isRequired,
    onDeleteUserExperience: PropTypes.func.isRequired,
    history: PropTypes.object,
    profile: PropTypes.object
  };

  //  Trigger When user profile is modify
  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;
    this.setState({ profile });
  }

  // Load current user profile
  componentWillMount() {
    const { profile } = this.props;
    this.setState({ profile });
  }

  // Show skill in badge style
  onShowSkills = skills => {
    let result = [];
    if (skills.length === 0) {
      return (
        <Link to="/create-profile" className="btn btn-sm btn-warning">
          <i className="fab fa fa-plus" /> Add skills
        </Link>
      );
    }
    result = skills.map((ele, index) => {
      return (
        <span key={index} className="badge badge-dark badge-pill">
          {ele}
        </span>
      );
    });
    return result;
  };

  //  Show social media link
  onShowSocialMedia = socials => {
    let result = [];
    if (isEmpty(socials)) {
      return (
        <Link to="/create-profile" className="btn btn-sm btn-info">
          <i className="fab fa fa-plus" /> Add social network
        </Link>
      );
    }
    result = Object.keys(socials).map((ele, index) => {
      return (
        <p key={index}>
          <SocialLink to={socials[ele]}>{ele}</SocialLink>
        </p>
      );
    });

    return result;
  };

  // onShowEducation
  onShowEducation = educations => {
    let result = [];
    if (educations.length === 0) {
      return null;
    } else {
      educations.sort((a, b) => {
        if (a.current === true || b.current === true) {
          return 1;
        }

        if (a.from < b.from) {
          return 1;
        }
        if (a.from > b.from) {
          return -1;
        }
        return 0;
      });
    }

    result = educations.map((ele, index) => {
      return (
        <EducationCard
          education={ele}
          key={ele._id}
          onDeleteUserEducation={this.props.onDeleteUserEducation}
        />
      );
    });

    return result;
  };
  // onShowExperience
  onShowExperience = experiences => {
    let result = [];
    if (experiences.length === 0) {
      return null;
    } else {
      experiences.sort((a, b) => {
        if (a.current === true || b.current === true) {
          return 1;
        }

        if (a.from < b.from) {
          return 1;
        }
        if (a.from > b.from) {
          return -1;
        }
        return 0;
      });
    }

    result = experiences.map((ele, index) => {
      return (
        <ExperienceCard
          experience={ele}
          key={ele._id}
          onDeleteUserExperience={this.props.onDeleteUserExperience}
        />
      );
    });

    return result;
  };
  // Scoll to top after update
  componentDidUpdate() {
    if (this.props.history.location.pathname !== this.props.history.match.url) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      career,
      education,
      experience,
      github,
      company,
      location,
      skills,
      user,
      website,
      bio,
      social
    } = this.state.profile;

    return (
      <React.Fragment>
        <div className="pb-2">
          <Link to="/create-profile" className="btn btn-primary mr-2">
            <i className="fas fa-pen-square mr-1" />
            Edit profile
          </Link>
          <Link to="/add-education" className="btn btn-info  mr-2">
            <i className="fas fa-plus-square mr-1" />
            Add education
          </Link>
          <Link to="/add-experience" className="btn btn-info  mr-2">
            <i className="fas fa-plus-square mr-1" />
            Add experience
          </Link>
        </div>
        <div className="row border p-4 my-card">
          <div className="col-md-12 m-auto ">
            <div className="row border shadow p-3 mb-5 rounded">
              <div id="profile-bg" />
              <div className="col-md-6 pt-5 pl-5 profile-part">
                <h1>{career}</h1>
                <h5>
                  {company ? (
                    <span>
                      at <strong>{company}</strong>
                    </span>
                  ) : (
                    ""
                  )}
                </h5>
                <br />
                <h3 className="lead">Skills</h3>
                {this.onShowSkills(skills)}
                {/* Social media Link */}
                <h3 className="lead mt-5">Social network</h3>
                {this.onShowSocialMedia(social)}
              </div>
              <div className="col-md-6 profile-part">
                <div id="profile" className="p-2">
                  <div>
                    <img
                      src={user.avatar}
                      className="img-fluid m-auto rounded-circle"
                      alt=""
                    />
                    <div>
                      <small>
                        <a
                          className="text-muted"
                          href="https://en.gravatar.com/"
                        >
                          Create avatar
                        </a>
                      </small>
                      <div />
                    </div>
                  </div>
                  <h4 className=" bold text-dark mt-3">{user.name}</h4>
                  <p className="text-muted">{user.email}</p>
                  <p className="text-muted">{location}</p>
                  <p>
                    <a href={github}>
                      <i className="fab fa-github">
                        {github === "" ? (
                          <small className="ml-2 text-muted">
                            (github url)
                          </small>
                        ) : (
                          github
                        )}
                      </i>
                    </a>
                  </p>
                  <p>
                    <a href={website}>
                      <i className="fas fa-globe ">
                        {" "}
                        {website === "" ? (
                          <small className="ml-2 text-muted">
                            (personal website url)
                          </small>
                        ) : (
                          website
                        )}
                      </i>
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 ml-5">
                {bio ? (
                  <div>
                    <p className="lead text-dark">About</p>
                    <p className="text-muted font-italic">{bio}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div />
        {/* Experience  */}
        <div className="row mt-5  my-card experience">
          <div className="col-md-12 m-auto border p-4">
            <div className="row pb-4">
              <div className="col-sm-11">
                <h5 className="lead text-dark font-weight-bold">Experience</h5>
              </div>
              <div className="col-sm-1">
                {/* Goto add exp */}
                <Link to="/add-experience">
                  <i id="add-education" className="fas fa fa-plus" />
                </Link>
              </div>
            </div>
            {/* Show education */}
            {this.onShowExperience(experience)}
          </div>
        </div>
        {/* Education  */}
        <div className="row mt-5  my-card education">
          <div className="col-md-12 m-auto border p-4">
            <div className="row pb-4">
              <div className="col-sm-11">
                <h5 className="lead text-dark font-weight-bold">Education</h5>
              </div>
              <div className="col-sm-1">
                {/* Goto add edu */}
                <Link to="/add-education">
                  <i id="add-education" className="fas fa fa-plus" />
                </Link>
              </div>
            </div>
            {/* Show education */}
            {this.onShowEducation(education)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashBoardProfile;
