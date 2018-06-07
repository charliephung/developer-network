import React, { Component } from "react";
import PropTypes from "prop-types";
// Isempty
import isEmpty from "../../utils/isEmpty";
export default class PostForm extends Component {
  static propTypes = {
    actAddComment: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      errors: nextProps.errors
    });
  }

  onAddComment = e => {
    e.preventDefault();

    this.props.actAddComment(this.props.post._id, {
      comment: this.state.comment
    });
    if (!isEmpty(this.state.comment)) {
      this.setState({
        comment: "",
        errors: {}
      });
    }
  };

  render() {
    const { post, user } = this.props;
    const { errors } = this.state;

    let content;
    if (isEmpty(user)) {
      content = <div />;
    }
    if (!isEmpty(user)) {
      content = (
        <form onSubmit={this.onAddComment} className="form">
          <img
            className="m-2"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%"
            }}
            src={post.user.avatar}
            alt={post.user.name}
          />
          {user.name}
          <textarea
            placeholder="Add a comment..."
            type="text"
            className={
              !isEmpty(errors)
                ? "form-control mb-1 is-invalid"
                : "form-control mb-1"
            }
            name="comment"
            value={this.state.comment}
            onChange={this.onChange}
          />
          {isEmpty(errors) ? null : (
            <p>
              <small className="text-danger">{errors.comment}</small>
            </p>
          )}
          {isEmpty(errors) ? null : (
            <p>
              <small className="text-danger">{errors.msg}</small>
            </p>
          )}
          <button className="btn btn-sm btn-primary ">Comment</button>
        </form>
      );
    }

    return (
      <div
        className="mt-2 mb-2 border rounded p-3"
        style={{ backgroundColor: "white" }}
      >
        {content}
      </div>
    );
  }
}
