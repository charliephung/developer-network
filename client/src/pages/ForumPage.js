import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// load comps
import ForumForm from "../components/forum/ForumForm";
import ForumFeed from "../components/forum/ForumFeed";
// load action
import * as ForumActions from "../actions/actForum";
// Is

export class ForumPage extends Component {
  static propTypes = {
    actGetAllPosts: PropTypes.func.isRequired,
    actAddNewPost: PropTypes.func.isRequired,
    actAddLikeToPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      post: [],
      posts: {},
      loading: false,
      errors: {}
    };
  }

  componentWillMount() {
    this.props.actGetAllPosts();
  }

  componentDidMount() {
    const { post, posts, loading } = this.props.post;
    const { errors } = this.props;
    this.setState({ post, posts, loading, errors });
  }

  componentWillReceiveProps(nextProps) {
    const { post, posts, loading } = nextProps.post;
    const { errors } = nextProps;
    this.setState({ post, posts, loading, errors });
  }

  render() {
    const { posts, errors, loading } = this.state;
    const { id } = this.props.auth.user;

    return (
      <React.Fragment>
        <h1 className="text-center text-bold display-3">Forums</h1>
        <div className="row">
          <div className="col-md-11 m-auto">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for"
                aria-describedby="search"
              />
              <div className="input-group-prepend">
                <span className="input-group-text" id="search">
                  <i className="fab fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="feed">
            <div className="col-md-11 m-auto">
              <div className="row">
                <div className="col-md-12">
                  {/* <!-- Post Form --> */}
                  <ForumForm
                    actAddNewPost={this.props.actAddNewPost}
                    errors={errors}
                  />
                  {/* <!-- Post Feed --> */}
                  <ForumFeed
                    userId={id}
                    posts={posts}
                    actAddLikeToPost={this.props.actAddLikeToPost}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth
});

const mapDispatchToProps = {
  actGetAllPosts: ForumActions.actGetAllPosts,
  actAddNewPost: ForumActions.actAddNewPost,
  actAddLikeToPost: ForumActions.actAddLikeToPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumPage);
