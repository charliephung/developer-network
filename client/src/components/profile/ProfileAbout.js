import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileAbout extends Component {
  static propTypes = {
    bio: PropTypes.string,
    name: PropTypes.string,
    skills: PropTypes.array.isRequired
  };

  render() {
    const { bio, skills, name } = this.props;
    const skillSet = skills.map((ele, index) => {
      return (
        <div key={index} className="p-3">
          <span className="badge badge-dark badge-pill">{ele}</span>
        </div>
      );
    });
    return (
      // <!-- Profile About -->
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-dark">{name}'s Bio</h3>
            {bio ? (
              <p className="lead">{bio}</p>
            ) : (
              <p className="text-muted">(User does not have a bio)</p>
            )}
            <hr />
            <h3 className="text-center text-dark">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap ">{skillSet}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
