import React, { Component } from "react";
import PropTypes from "prop-types";
// Load time parser
import MyMoment from "../common/MyMoment";
// load with router
import { withRouter } from "react-router-dom";

class EducationCard extends Component {
  static propTypes = {
    education: PropTypes.object.isRequired,
    onDeleteUserEducation: PropTypes.func.isRequired
  };

  // ondeleteEdu
  onDeleteUserEducation = () => {
    this.props.onDeleteUserEducation(
      this.props.education._id,
      this.props.history
    );
  };

  render() {
    const { education } = this.props;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-11">
            <div className="font-weight-bold">{education.school} </div>
            <div className="text-muted">{education.degree}</div>
            <div className="text-muted">{education.fieldofstudy}</div>
            <div className="text-muted">{education.description}</div>
            <div className="font-italic">
              <MyMoment date={education.from} /> –
              {education.current ? " Now" : <MyMoment date={education.to} />}
            </div>
          </div>
          <div className="col-sm-1">
            <i
              className="time fas fa-trash text-danger"
              onClick={
                this.onDeleteUserEducation // Delete field
              }
            />
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default withRouter(EducationCard);
