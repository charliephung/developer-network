import React, { Component } from "react";
import PropTypes from "prop-types";
// Link
import { Link } from "react-router-dom";
// Time
import MyMoment from "../common/MyMoment";
// isempty
import isEmpty from "../../utils/isEmpty";

export default class PostText extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    actAddLikeToPost: PropTypes.func.isRequired,
    liked: PropTypes.object,
    history: PropTypes.object
  };

  onToggleLike = () => {
    this.props.actAddLikeToPost(this.props.post._id);
  };
  onDeletePost = () => {
    this.props.actDeletePost(this.props.post._id, this.props.history);
  };

  render() {
    const { post, liked, user } = this.props;

    return (
      <div
        className="rounded border"
        style={{ backgroundColor: "white", padding: "1rem" }}
      >
        <div className="border p-2 rounded" style={{ position: "relative" }}>
          <Link className="text-dark " to={`/profile/${post.user._id}`}>
            <img
              className="rounded-circle d-none mr-2 d-md-inline avatar"
              src={post.user.avatar}
              alt=""
            />
          </Link>
          <span>{post.user.name}</span>
          {!isEmpty(user) && user.id === post.user._id ? (
            <span>
              <button
                onClick={this.onDeletePost}
                className="btn btn-sm btn-danger float-right"
              >
                Delete
              </button>
            </span>
          ) : null}
        </div>
        <h2>{post.title}</h2>
        <p>{post.text}</p>
        <small className="">
          <em>
            posted on <MyMoment date={post.date} />
          </em>
        </small>
        <hr />
        <div>
          <span>
            {post.likes.length}
            <i
              onClick={this.onToggleLike}
              className={
                liked ? "ml-2 far fa-thumbs-up liked" : "ml-2 far fa-thumbs-up "
              }
            />
          </span>
        </div>
      </div>
    );
  }
}
