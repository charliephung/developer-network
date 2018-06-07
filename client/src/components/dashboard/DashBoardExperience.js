import React, { Component } from "react";
import PropTypes from "prop-types";
// Load time parser
import MyMoment from "../common/MyMoment";
// load with router
import { withRouter } from "react-router-dom";

class ExperienceCard extends Component {
  static propTypes = {
    experience: PropTypes.object.isRequired,
    onDeleteUserExperience: PropTypes.func.isRequired
  };

  // ondeleteEdu
  onDeleteUserExperience = () => {
    this.props.onDeleteUserExperience(
      this.props.experience._id,
      this.props.history
    );
  };

  render() {
    const { experience } = this.props;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-11">
            <div className="font-weight-bold">{experience.title} </div>
            <div className="text-muted">{experience.company}</div>
            <div className="text-muted">{experience.location}</div>
            <div className="text-muted">{experience.description}</div>
            <div className="font-italic">
              <MyMoment date={experience.from} /> –
              {experience.current ? " Now" : <MyMoment date={experience.to} />}
            </div>
          </div>
          <div className="col-sm-1">
            <i
              className="time fas fa-trash text-danger"
              onClick={
                this.onDeleteUserExperience // Delete field
              }
            />
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default withRouter(ExperienceCard);
