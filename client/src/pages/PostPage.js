import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Link
import { Link, withRouter } from "react-router-dom";
// load acttion
import * as ForumActions from "../actions/actForum";
// load spinner
import Spinner from "../components/common/Spinner";
// Form
import PostForm from "../components/forum/PostForm";
import PostComment from "../components/forum/PostComment";
import PostText from "../components/forum/PostText";
// isempty
import isEmpty from "../utils/isEmpty";
// Not found
import NotFoundPage from "../pages/NotFoundPage";
// Time
import MyMoment from "../components/common/MyMoment";

export class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      post: {},
      errors: {},
      loading: false
    };
  }
  static propTypes = {
    actGetPost: PropTypes.func.isRequired,
    actAddComment: PropTypes.func.isRequired,
    actDeleteComment: PropTypes.func.isRequired,
    actAddLikeToPost: PropTypes.func.isRequired,
    actLikeComment: PropTypes.func.isRequired,
    actDeletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.actGetPost(this.props.match.params.post_id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      post: nextProps.post.post,
      loading: nextProps.post.loading,
      errors: nextProps.errors
    });
  }

  render() {
    const { post, errors, loading } = this.state;
    let postContent;
    if (loading && isEmpty(post)) {
      postContent = (
        <div className="row">
          <div className="col-md-2 m-auto">
            <Spinner />
          </div>
        </div>
      );
    }
    if (!loading && isEmpty(post)) {
      postContent = <NotFoundPage />;
    }
    if (!loading && !isEmpty(post)) {
      const { user } = this.props.auth;
      let liked;
      if (user) {
        liked = post.likes.find(ele => ele._id === user.id);
      }

      const postItem = post.comments.map(ele => {
        return (
          <PostComment
            postId={post._id}
            key={ele._id}
            comment={ele}
            user={user}
            actDeleteComment={this.props.actDeleteComment}
            actLikeComment={this.props.actLikeComment}
          />
        );
      });

      postContent = (
        <div>
          <Link to="/forum" className="btn btn-dark btn-sm mb-4">
            Go back to forum
          </Link>
          <PostText
            user={user}
            post={post}
            liked={liked}
            history={this.props.history}
            actAddLikeToPost={this.props.actAddLikeToPost}
            actDeletePost={this.props.actDeletePost}
          />
          <div className="row">
            <div className="col-md-12">
              <PostForm
                post={post}
                user={user}
                errors={errors}
                actAddComment={this.props.actAddComment}
              />
              <div />
            </div>
          </div>
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-11">
              <hr />
              {postItem}
            </div>
          </div>
        </div>
      );
    }

    return <div>{postContent}</div>;
  }
}

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth
});

const mapDispatchToProps = {
  actGetPost: ForumActions.actGetPost,
  actAddLikeToPost: ForumActions.actAddLikeToPost,
  actDeletePost: ForumActions.actDeletePost,
  actAddComment: ForumActions.actAddComment,
  actDeleteComment: ForumActions.actDeleteComment,
  actLikeComment: ForumActions.actLikeComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostPage));
