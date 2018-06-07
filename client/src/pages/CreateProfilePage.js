import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Use with router to pass history along with action
import { withRouter } from "react-router-dom";
// Load Component
import FormGroup from "../components/inputfields/FormGroup";
import InputField from "../components/inputfields/InputField";
import OptionField from "../components/inputfields/OptionField";
import TextAreaField from "../components/inputfields/TextAreaField";
// Link
import { Link } from "react-router-dom";
// Load action
import * as ProfileActions from "../actions/actProfile";
// isempty
import isEmpty from "../utils/isEmpty";

export class CreateProfilePage extends Component {
  // Es7 version of proptypes
  static propTypes = {
    errors: PropTypes.object.isRequired,
    actSubmitUserProfile: PropTypes.func.isRequired,
    actGetUserProfile: PropTypes.func.isRequired,
    profile: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      handle: "",
      career: "",
      company: "",
      location: "",
      website: "",
      skills: "",
      github: "",
      bio: "",
      socialNetwork: false,
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      youtube: "",
      errors: {}
    };
  }

  // Trigger when receive new prop
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (!isEmpty(nextProps.profile.profile)) {
      const {
        handle,
        career,
        company,
        location,
        website,
        skills,
        github,
        bio
      } = nextProps.profile.profile;

      if (isEmpty(nextProps.profile.profile.social)) {
        nextProps.profile.profile.social = {};
      }
      const {
        facebook,
        twitter,
        youtube,
        linkedin,
        instagram
      } = nextProps.profile.profile.social;

      //   set value
      this.setState({
        handle: handle ? handle : "",
        career: career ? career : "",
        company: company ? company : "",
        location: location ? location : "",
        website: website ? website : "",
        skills: skills ? skills.join(",") : "",
        github: github ? github : "",
        bio: bio ? bio : "",
        facebook: facebook ? facebook : "",
        twitter: twitter ? twitter : "",
        youtube: youtube ? youtube : "",
        linkedin: linkedin ? linkedin : "",
        instagram: instagram ? instagram : "",
        socialNetwork: true
      });
    }
  }

  //Get the current profile
  //   If profile then => edit page else create page
  componentDidMount() {
    // Check user profile
    this.props.actGetUserProfile();
  }

  onToggleSocialNetwork = () => {
    this.setState({
      socialNetwork: !this.state.socialNetwork,
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      youtube: ""
    });
  };

  onChange = e => {
    let { name, value } = e.target;
    if (name === "handle") {
      value = value.toLowerCase();
    }
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    // Get value
    const {
      handle,
      career,
      company,
      location,
      website,
      skills,
      github,
      bio,
      socialNetwork,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube
    } = this.state;

    const userProfile = {
      handle,
      career: career ? career : "",
      company: company ? company : "",
      location: location ? location : "",
      website: website ? website : "",
      skills: skills ? skills : "",
      github: github ? github : "",
      bio: bio ? bio : "",
      socialNetwork: socialNetwork ? socialNetwork : "",
      facebook: facebook ? facebook : "",
      instagram: instagram ? instagram : "",
      twitter: twitter ? twitter : "",
      linkedin: linkedin ? linkedin : "",
      youtube: youtube ? youtube : ""
    };

    // Call action
    this.props.actSubmitUserProfile(userProfile, this.props.history);
  };

  render() {
    const options = [
      { label: "* Select your career status", value: "0" },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Instructor", value: "Instructor" },
      { label: "Teacher", value: "Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Others", value: "Others" }
    ];

    // state
    const {
      handle,
      career,
      company,
      location,
      website,
      skills,
      github,
      bio,
      socialNetwork,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube
    } = this.state;

    // Error
    const { errors } = this.state;
    const { profile } = this.props;

    return (
      <form onSubmit={this.onSubmit} className="col-lg-10 m-auto">
        <Link to="/dashboard" className="btn btn-secondary btn-sm">
          Go Back
        </Link>
        <br />
        <h1 className="text-muted text-center">
          {isEmpty(profile.profile)
            ? "Create your profile"
            : `Edit ${this.props.auth.user.name}'s Profile`}
        </h1>
        <p className="text-muted ">* is required field</p>
        <br />
        {/* Handle */}
        <FormGroup
          labelFor="handle"
          labelName="Handle"
          // Error text
          invalidText={errors.handle}
          bottomText="a unique name so others can search for you"
        >
          <InputField
            disabled={isEmpty(profile.profile) ? false : true}
            invalid={errors.handle ? true : false}
            placeholder="* Profile Handle (Cannot be change later on)"
            name="handle"
            value={handle}
            onChange={this.onChange}
            id="handle"
          />
        </FormGroup>
        {/* Career */}
        <FormGroup
          labelFor="career"
          labelName="Career"
          invalidText={errors.career}
          bottomText="where you are in your career"
        >
          <OptionField
            invalid={errors.career ? true : false}
            name="career"
            id="career"
            onChange={this.onChange}
            value={career}
          >
            {options}
          </OptionField>
        </FormGroup>
        {/* Company */}
        <FormGroup
          labelFor="company"
          labelName="Company"
          bottomText="your company or one you work for"
        >
          <InputField
            placeholder="Company"
            name="company"
            value={company}
            onChange={this.onChange}
            id="company"
          />
        </FormGroup>
        {/* Location */}
        <FormGroup
          labelFor="location"
          labelName="Location"
          bottomText="city and country"
        >
          <InputField
            placeholder="Location"
            name="location"
            value={location}
            onChange={this.onChange}
            id="location"
          />
        </FormGroup>
        {/* Website */}
        <FormGroup
          labelFor="website"
          labelName="Website"
          invalidText={errors.website}
          bottomText="your own website URL"
        >
          <InputField
            invalid={errors.website ? true : false}
            placeholder="Website URL"
            name="website"
            value={website}
            onChange={this.onChange}
            id="website"
          />
        </FormGroup>
        {/* Skills */}
        <FormGroup
          labelFor="skills"
          labelName="Skills"
          invalidText={errors.skills}
          bottomText="please use comma separated values (eg: Python, JavaScript, PHP"
        >
          <InputField
            invalid={errors.skills ? true : false}
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={this.onChange}
            id="skills"
          />
        </FormGroup>
        {/* Github */}
        <FormGroup
          labelFor="github"
          labelName="Github"
          invalidText={errors.github}
          bottomText="if your want to display your lasted repos"
        >
          <InputField
            invalid={errors.github ? true : false}
            placeholder="Github URL"
            name="github"
            value={github}
            onChange={this.onChange}
            id="github"
          />
        </FormGroup>
        <FormGroup
          labelFor="bio"
          labelName="Bio"
          bottomText="tell us about yourself"
        >
          <TextAreaField
            placeholder="Describe yourself..."
            name="bio"
            value={bio}
            onChange={this.onChange}
            id="bio"
          />
        </FormGroup>
        <FormGroup labelName="Social Network">
          <button
            type="button"
            className={
              !socialNetwork
                ? "btn text-muted  mb-2 "
                : "btn btn-success text-light mb-2"
            }
            onClick={this.onToggleSocialNetwork}
          >
            Add social network
          </button>
        </FormGroup>
        {socialNetwork ? (
          <div>
            <FormGroup labelName="Facebook" invalidText={errors.facebook}>
              <InputField
                invalid={errors.facebook ? true : false}
                icon="fab fa-facebook"
                placeholder="Facebook Page URL"
                name="facebook"
                onChange={this.onChange}
                value={facebook}
              />
            </FormGroup>
            <FormGroup labelName="Twitter" invalidText={errors.twitter}>
              <InputField
                invalid={errors.twitter ? true : false}
                invalidText={errors.twitter}
                icon="fab fa-twitter"
                placeholder="Twitter Profile URL"
                name="twitter"
                onChange={this.onChange}
                value={twitter}
              />
            </FormGroup>
            <FormGroup labelName="Linkedin" invalidText={errors.linkedin}>
              <InputField
                invalid={errors.linkedin ? true : false}
                invalidText={errors.linkedin}
                icon="fab fa-linkedin"
                placeholder="Linkedin Profile URL"
                name="linkedin"
                onChange={this.onChange}
                value={linkedin}
              />
            </FormGroup>
            <FormGroup labelName="Instagram" invalidText={errors.instagram}>
              <InputField
                invalid={errors.instagram ? true : false}
                invalidText={errors.instagram}
                icon="fab fa-instagram"
                placeholder="Instagram Page URL"
                name="instagram"
                onChange={this.onChange}
                value={instagram}
              />
            </FormGroup>
            <FormGroup labelName="Youtube" invalidText={errors.youtube}>
              <InputField
                invalid={errors.youtube ? true : false}
                invalidText={errors.youtube}
                icon="fab fa-youtube"
                placeholder="Youtube Channel URL"
                name="youtube"
                onChange={this.onChange}
                value={youtube}
              />
            </FormGroup>
          </div>
        ) : (
          ""
        )}
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = {
  actSubmitUserProfile: ProfileActions.actSubmitUserProfile,
  actGetUserProfile: ProfileActions.actGetUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(CreateProfilePage)
);
