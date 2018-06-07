import React, { Component } from "react";
import PropTypes from "prop-types";
// Link
import { Link } from "react-router-dom";

class ProfileHeader extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    company: PropTypes.string,
    career: PropTypes.string,
    github: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
    social: PropTypes.object
  };

  render() {
    const {
      user,
      company,
      location,
      social,
      website,
      career,
      github
    } = this.props;

    return (
      //    <!-- Profile Header -->
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-dark text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{user.name}</h1>
              <p className="lead text-center">{career ? career : ""}</p>
              <p>{company ? `at ${company}` : ""}</p>
              <p>
                {website ? (
                  <a className="text-white p-2" href={website}>
                    <i className="fas fa-globe fa-2x" />
                  </a>
                ) : (
                  ""
                )}
                {github ? (
                  <a className="text-white p-2" href={github}>
                    <i className="fab fa-github fa-2x" />
                  </a>
                ) : (
                  ""
                )}
                {social && social.twitter ? (
                  <a className="text-white p-2" href={social.twitter}>
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                ) : (
                  ""
                )}
                {social && social.facebook ? (
                  <a className="text-white p-2" href={social.facebook}>
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                ) : (
                  ""
                )}
                {social && social.linkedin ? (
                  <a className="text-white p-2" href={social.linkedin}>
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                ) : (
                  ""
                )}
                {social && social.instagram ? (
                  <a className="text-white p-2" href={social.instagram}>
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
