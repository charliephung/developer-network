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

export class AddExperiencePage extends Component {
  static propTypes = {
    errors: PropTypes.object,
    actSubmitUserExperience: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      experience: {
        title: "",
        company: "",
        location: "",
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
      experience: {
        ...this.state.experience,
        errors: nextProps.errors
      }
    });
  }
  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      experience: {
        ...this.state.experience,
        [name]: value
      }
    });
  };

  onCheck = e => {
    this.setState({
      experience: {
        ...this.state.experience,
        current: !this.state.experience.current
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.actSubmitUserExperience(
      this.state.experience,
      this.props.history
    );
  };

  render() {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
      errors
    } = this.state.experience;

    return (
      <form onSubmit={this.onSubmit} className="col-lg-10 m-auto">
        <Link to="/dashboard" className="btn btn-secondary btn-sm">
          Go Back
        </Link>
        <br />
        <h1 className="text-muted text-center">Add Experience</h1>
        <p className="text-muted ">* is required field</p>
        <FormGroup
          labelFor="title"
          labelName="Title"
          invalidText={errors.title}
        >
          <InputField
            onChange={this.onChange}
            placeholder="* Title"
            name="title"
            id="title"
            value={title}
            invalid={errors.title ? true : false}
          />
        </FormGroup>
        <FormGroup
          labelFor="company"
          labelName="Company"
          invalidText={errors.company}
        >
          <InputField
            onChange={this.onChange}
            placeholder="* Company"
            name="company"
            id="company"
            value={company}
            invalid={errors.company ? true : false}
          />
        </FormGroup>
        <FormGroup labelFor="location" labelName="Company address">
          <InputField
            onChange={this.onChange}
            placeholder="Company address"
            name="location"
            id="location"
            value={location}
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
            invalid={errors.to ? true : false}
            onChange={this.onChange}
            name="to"
            id="to"
            value={to}
            disabled={current ? true : false}
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
              Current working
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
  actSubmitUserExperience: ProfileActions.actSubmitUserExperience
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(AddExperiencePage)
);
