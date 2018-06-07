import React, { Component } from "react";
import PropTypes from "prop-types";
// Moment
import MyMoment from "../common/MyMoment";

class ProfileCreds extends Component {
  static propTypes = {
    education: PropTypes.array,
    experience: PropTypes.array
  };

  render() {
    const { education, experience } = this.props;
    const eduSet = education.map((ele, index) => {
      return (
        <li key={index} className="list-group-item">
          <h4>{ele.school}</h4>
          <p>
            <MyMoment date={ele.from} /> -
            {ele.current ? <strong> Now</strong> : <MyMoment date={ele.to} />}
          </p>
          <p>
            <strong>Degree: </strong>
            {ele.degree}
          </p>
          {ele.fieldofstudy ? (
            <p>
              <strong>Field Of Study: </strong>Computer Science
            </p>
          ) : (
            ""
          )}
          {ele.description ? (
            <p>
              <strong>Description: </strong>
              {ele.description}
            </p>
          ) : (
            ""
          )}
        </li>
      );
    });
    const expSet = experience.map((ele, index) => {
      return (
        <li key={index} className="list-group-item">
          <h4>{ele.company}</h4>
          <p>
            <MyMoment date={ele.from} /> -
            {ele.current ? <strong> Now</strong> : <MyMoment date={ele.to} />}
          </p>
          <p>
            <strong>Position: </strong>
            {ele.title}
          </p>
          {ele.location ? (
            <p>
              <strong>location: </strong>
              {ele.location}
            </p>
          ) : (
            ""
          )}
          {ele.description ? (
            <p>
              <strong>Description: </strong>
              {ele.description}
            </p>
          ) : (
            ""
          )}
        </li>
      );
    });

    return (
      // <!-- Profile Creds -->
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-dark">Education</h3>
          <ul className="list-group">
            {eduSet.length === 0 ? (
              <li className="list-group-item">
                <p className="text-muted">(Education field is empty)</p>
              </li>
            ) : (
              eduSet
            )}
          </ul>
        </div>
        <div className="col-md-12">
          <h3 className="text-center text-dark">Experience</h3>
          <ul className="list-group">
            {expSet.length === 0 ? (
              <li className="list-group-item">
                <p className="text-muted">(Experience field is empty)</p>
              </li>
            ) : (
              expSet
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
