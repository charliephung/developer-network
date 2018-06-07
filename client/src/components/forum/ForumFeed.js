import React, { Component } from "react";
// prop types
import PropTypes from "prop-types";
// Load item
import ForumItem from "./ForumItem";
// istempty
import isEmpty from "../../utils/isEmpty";
// Spinner
import Spinner from "../common/Spinner";

export default class ForumFeed extends Component {
  static propTypes = {
    actAddLikeToPost: PropTypes.func.isRequired,
    posts: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    loading: PropTypes.bool.isRequired,
    userId: PropTypes.string
  };

  render() {
    const { posts, loading, actAddLikeToPost, userId } = this.props;
    let forumItems;
    if (loading && isEmpty(posts)) {
      forumItems = (
        <tr>
          <td className="text-center" colSpan="4">
            <Spinner />
          </td>
        </tr>
      );
    }
    if (!loading && isEmpty(posts)) {
      forumItems = (
        <tr>
          <td className="text-center" colSpan="4">
            <h2>There are no post</h2>
          </td>
        </tr>
      );
    }
    if (!isEmpty(posts)) {
      forumItems = posts.map(ele => {
        return (
          <ForumItem
            key={ele._id}
            post={ele}
            actAddLikeToPost={actAddLikeToPost}
            userId={userId}
          />
        );
      });
    }

    return (
      <div className="posts">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "10%" }}>LIKES</th>
              <th style={{ width: "40%" }}>POST</th>
              <th style={{ width: "25%" }} className="">
                COMMENTS
              </th>
              <th style={{ width: "25%" }} className="">
                AUTHOR
              </th>
            </tr>
          </thead>
          <tbody>{forumItems}</tbody>
        </table>
      </div>
    );
  }
}
