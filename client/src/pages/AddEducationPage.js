import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Link
import { Link, withRouter } from "react-router-dom";
// Load input fields
import FormGroup from "../components/inputfields/FormGroup";
import InputField from "../components/inputfields/InputField";
import TextAreaField from "../components/inputfields/TextAreaField";
// Load action
import * as ProfileActions from "../actions/actProfile";

export class AddEducationPage extends Component {
  static propTypes = {
    errors: PropTypes.object,
    actSubmitUserEducation: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      education: {
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: true,
        description: "",
        errors: {}
      }
    };
  }
  // Check errors
  componentWillReceiveProps(nextProps) {
    this.setState({
      education: {
        ...this.state.education,
        errors: nextProps.errors
      }
    });
  }
  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      education: {
        ...this.state.education,
        [name]: value
      }
    });
  };

  onCheck = e => {
    this.setState({
      education: {
        ...this.state.education,
        current: !this.state.education.current
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.actSubmitUserEducation(this.state.education, this.props.history);
  };

  render() {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      errors
    } = this.state.education;

    return (
      <form onSubmit={this.onSubmit} className="col-lg-10 m-auto">
        <Link to="/dashboard" className="btn btn-secondary btn-sm">
          Go Back
        </Link>
        <br />
        <h1 className="text-muted text-center">Add Education</h1>
        <p className="text-muted ">* is required field</p>
        <FormGroup
          labelFor="school"
          labelName="School"
          invalidText={errors.school}
        >
          <InputField
            onChange={this.onChange}
            placeholder="* School"
            name="school"
            id="school"
            value={school}
            invalid={errors.school ? true : false}
          />
        </FormGroup>
        <FormGroup
          labelFor="degree"
          labelName="Degree"
          invalidText={errors.degree}
        >
          <InputField
            onChange={this.onChange}
            placeholder="* Degree"
            name="degree"
            id="degree"
            value={degree}
            invalid={errors.degree ? true : false}
          />
        </FormGroup>
        <FormGroup labelFor="fieldofstudy" labelName="Field of Study">
          <InputField
            onChange={this.onChange}
            placeholder="Field of Study"
            name="fieldofstudy"
            id="fieldofstudy"
            value={fieldofstudy}
          />
        </FormGroup>
        <FormGroup labelFor="from" labelName="From" invalidText={errors.from}>
          <InputField
            type="date"
            onChange={this.onChange}
            name="from"
            id="from"
            value={from}
            invalid={errors.from ? true : false}
          />
        </FormGroup>
        <FormGroup labelFor="to" labelName="To" invalidText={errors.to}>
          <InputField
            type="date"
            onChange={this.onChange}
            name="to"
            id="to"
            value={to}
            disabled={current ? true : false}
            invalid={errors.to ? true : false}
          />
        </FormGroup>
        <FormGroup>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                checked={current}
                onChange={this.onCheck}
              />
              Current studying
            </label>
          </div>
        </FormGroup>
        <FormGroup labelFor="description" labelName="Description">
          <TextAreaField
            placeholder="Description"
            onChange={this.onChange}
            name="description"
            id="description"
            value={description}
          />
        </FormGroup>

        <button type="submit" className="btn btn-info btn-lg btn-block">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  actSubmitUserEducation: ProfileActions.actSubmitUserEducation
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(AddEducationPage)
);
