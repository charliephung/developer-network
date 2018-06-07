import * as Types from "../constants/ActionTypes";

let initialState = {
  posts: [],
  post: {},
  loading: false
};

const PostReducer = (state = initialState, actions) => {
  let newPost,
    index = -1,
    cmtIndex = -1,
    likeIndex = 1;
  switch (actions.type) {
    case Types.POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case Types.GET_ALL_POSTS:
      return {
        ...state,
        loading: false,
        posts: actions.payload
      };
    case Types.ADD_POST:
      newPost = [...actions.payload];
      return {
        ...state,
        posts: newPost
      };
    case Types.GET_POST:
      return {
        ...state,
        loading: false,
        post: { ...actions.payload[0] }
      };
    case Types.DELETE_POST:
      newPost = [...state.posts];
      index = newPost.findIndex(ele => ele._id === actions.payload);
      newPost.splice(index, 1);
      return {
        ...state,
        post: {},
        posts: newPost
      };

    case Types.LIKE_UNLIKE_POST:
      newPost = [...state.posts];
      index = newPost.findIndex(ele => ele._id === actions.payload._id);
      newPost[index] = actions.payload;
      return {
        ...state,
        post: newPost[index],
        posts: newPost
      };

    case Types.ADD_COMMENT:
      newPost = [...state.posts];
      index = newPost.findIndex(ele => ele._id === actions.payload._id);
      newPost[index] = actions.payload;
      return {
        ...state,
        post: newPost[index],
        posts: newPost
      };
    case Types.DELETE_COMMENT:
      newPost = { ...state.post };
      index = newPost.comments.findIndex(
        ele => ele._id === actions.payload.commentId
      );
      newPost.comments.splice(index, 1);
      return {
        ...state,
        post: newPost
      };
    case Types.LIKE_UNLIKE_COMMENT:
      newPost = { ...state.post };
      cmtIndex = newPost.comments.findIndex(
        ele => ele._id === actions.payload.commentId
      );
      likeIndex = newPost.comments[cmtIndex].likes.findIndex(
        ele => ele._id === actions.payload.userId
      );
      if (likeIndex === -1) {
        newPost.comments[cmtIndex].likes.push({ _id: actions.payload.userId });
      } else {
        newPost.comments[cmtIndex].likes.splice(likeIndex, 1);
      }
      return {
        ...state,
        post: newPost
      };
    default:
      return state;
  }
};

export default PostReducer;
