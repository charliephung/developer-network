import React, { Component } from "react";
import PropTypes from "prop-types";

// isempty
import isEmpty from "../../utils/isEmpty";
export default class ForumForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      title: "",
      errors: {}
    };
  }

  static propTypes = {
    actAddNewPost: PropTypes.func.isRequired,
    errors: PropTypes.object
  };

  // Form logic
  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.onAddPost();
  };
  onAddPost = () => {
    const data = {
      title: this.state.title,
      text: this.state.text
    };
    this.props.actAddNewPost(data);
  };

  // Load errors
  componentDidMount() {
    this.setState({
      ...this.state,
      errors: this.props.errors
    });
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      ...this.state,
      errors: nextprops.errors
    });
    if (isEmpty(nextprops.errors)) {
      this.setState({
        text: "",
        title: "",
        errors: {}
      });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-dark">
          <div className="card-header bg-dark text-white">
            <span className="text-bold"> Create Post</span>
          </div>
          {isEmpty(errors) ? null : (
            <p className=" text-center text-danger">{errors.msg}</p>
          )}
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                  className={
                    isEmpty(errors.title)
                      ? "form-control mb-2"
                      : "form-control mb-2 is-invalid"
                  }
                />
                {!isEmpty(errors.title) ? (
                  <small className="form -text text-danger">
                    {errors.title}
                  </small>
                ) : null}
                <textarea
                  onChange={this.onChange}
                  value={this.state.text}
                  name="text"
                  className={
                    isEmpty(errors.text)
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Post"
                />
                {!isEmpty(errors.text) ? (
                  <small className="form -text text-danger">
                    {errors.text}
                  </small>
                ) : null}
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
