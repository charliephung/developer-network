import axios from "axios";
import * as Types from "../constants/ActionTypes";

// Get all posts
export const actGetAllPosts = () => dispatch => {
  dispatch({ type: Types.POST_LOADING });
  axios
    .get("/api/posts/")
    .then(res => {
      dispatch({
        type: Types.GET_ALL_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ALL_POSTS,
        payload: {}
      });
    });
};

// Add a new post
export const actAddNewPost = newPost => dispatch => {
  axios
    .post("/api/posts/", newPost)
    .then(res => {
      dispatch({ type: Types.CLEAR_ERRORS });
      dispatch({
        type: Types.ADD_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Add like or UnLike to post
export const actAddLikeToPost = postId => dispatch => {
  axios
    .post(`/api/posts/${postId}/likes`)
    .then(res => {
      dispatch({
        type: Types.LIKE_UNLIKE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get viewing post
export const actGetPost = postId => dispatch => {
  dispatch({ type: Types.POST_LOADING });
  axios
    .get(`/api/posts/${postId}`)
    .then(res => {
      dispatch({
        type: Types.GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Delete post
export const actDeletePost = (postId, history) => dispatch => {
  history.push("/forum");
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => {
      dispatch({
        type: Types.DELETE_POST,
        payload: postId
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Submit comment
export const actAddComment = (postId, comment) => dispatch => {
  axios
    .post(`/api/posts/${postId}/comments`, comment)
    .then(res => {
      dispatch({ type: Types.CLEAR_ERRORS });
      dispatch({
        type: Types.ADD_COMMENT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Comment
export const actDeleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/${postId}/comments/${commentId}`)
    .then(res => {
      dispatch({ type: Types.CLEAR_ERRORS });
      dispatch({
        type: Types.DELETE_COMMENT,
        payload: { postId, commentId }
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like comment
export const actLikeComment = (postId, commentId, userId) => dispatch => {
  axios
    .post(`/api/posts/${postId}/comments/${commentId}`)
    .then(res => {
      dispatch({
        type: Types.LIKE_UNLIKE_COMMENT,
        payload: {
          postId,
          commentId,
          userId
        }
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
