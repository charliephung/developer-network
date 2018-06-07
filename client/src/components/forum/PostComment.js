import React, { Component } from "react";
import PropTypes from "prop-types";
// time
import MyMoment from "../common/MyMoment";
// isempty
import isEmpty from "../../utils/isEmpty";

export default class PostComment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    actDeleteComment: PropTypes.func.isRequired,
    actLikeComment: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
  };

  onDeleteComment = () => {
    this.props.actDeleteComment(this.props.postId, this.props.comment._id);
  };

  onToggleLike = () => {
    this.props.actLikeComment(
      this.props.postId,
      this.props.comment._id,
      this.props.user.id
    );
  };

  render() {
    const { comment, user } = this.props;
    let likeIndex = -1;
    if (!isEmpty(user)) {
      likeIndex = comment.likes.findIndex(ele => ele._id === user.id);
    }

    return (
      <div>
        <hr />
        <img
          className="m-2"
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%"
          }}
          src={comment.user.avatar}
          alt={comment.user.name}
        />
        {comment.user.name}
        {!isEmpty(user) && user.id === comment.user._id ? (
          <span>
            <button
              onClick={this.onDeleteComment}
              className="btn btn-sm btn-danger float-right"
            >
              Delete
            </button>
          </span>
        ) : null}

        <p className="text-muted">{comment.comment}</p>
        <div className="align-middle">
          {comment.likes.length}
          <i
            onClick={this.onToggleLike}
            className={
              !isEmpty(user) && likeIndex !== -1
                ? "ml-2 far fa-thumbs-up liked"
                : "ml-2 far fa-thumbs-up"
            }
          />
        </div>
        <small className="text-muted">
          Created on <MyMoment date={comment.date} />
        </small>
        <hr />
      </div>
    );
  }
}
