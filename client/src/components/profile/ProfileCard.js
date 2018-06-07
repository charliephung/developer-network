import React, { Component } from "react";
// Link
import { Link } from "react-router-dom";

export default class ProfileCard extends Component {
  // Show skill in badge style
  onShowSkills = skills => {
    let result = [];
    result = skills.map((ele, index) => {
      return (
        <span key={index} className="badge badge-dark badge-pill">
          {ele}
        </span>
      );
    });
    if (result.length > 4) {
      result = result.splice(0, 4);
      result.push(
        <span key={5} className="badge badge-dark badge-pill">
          ...
        </span>
      );
    }
    return result;
  };

  render() {
    const { user, profile } = this.props;
    const { career, location, skills, handle, company } = profile;
    return (
      <div className="container p-3  my-card-item border">
        <div className="row">
          <div className="col-md-12 m-auto">
            <div className="row">
              <div className="col-md-6">
                <div className="profile-image p-3" style={{ float: "left" }}>
                  <img
                    style={{ width: "60px", height: "60px" }}
                    className="rounded-circle"
                    src={user.avatar}
                    alt={user.name}
                  />
                </div>
                <div className="profile-info">
                  <Link to={`/profile/${handle}`} className="text-primary lead">
                    {user.name}
                  </Link>
                  <div className="text-muted lead">
                    {career}
                    {company ? <span> at {company}</span> : ""}
                  </div>
                  <small className="text-muted">{location}</small>
                </div>
              </div>
              <div className="col-md-6">
                <p>Skills</p>
                {this.onShowSkills(skills)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
