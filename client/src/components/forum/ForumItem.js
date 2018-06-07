import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class ForumFeed extends Component {
  static propTypes = {
    actAddLikeToPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    userId: PropTypes.string
  };

  onToggleLike = id => {
    this.props.actAddLikeToPost(id);
  };
  render() {
    const { post, userId } = this.props;
    let liked;
    if (post) {
      if (post.likes && post.likes.length > 0) {
        liked = post.likes.find(ele => ele._id === userId);
      }
    }

    return (
      <tr>
        <td>
          {post.likes.length}
          <i
            onClick={() => this.onToggleLike(post._id)}
            className={
              liked ? "ml-2 far fa-thumbs-up liked" : "ml-2 far fa-thumbs-up"
            }
          />
        </td>
        <td>
          <Link className="text-dark" to={`forum/${post._id}`}>
            <strong>{post.title}</strong>
            <p>
              <small>
                {post.text.length < 100
                  ? post.text
                  : post.text.substring(0, 100) + "..."}
              </small>
            </p>
          </Link>
        </td>
        <td>
          <p className="text-dark" to={`forum/${post._id}`}>
            {post.comments.length}
          </p>
        </td>
        <td>
          <Link className="text-dark" to={`/profile/`}>
            <img
              className="rounded-circle d-none mr-2 d-md-inline avatar"
              src={post.user.avatar}
              alt=""
            />
          </Link>
          <span>{post.user.name}</span>
        </td>
      </tr>
    );
  }
}
