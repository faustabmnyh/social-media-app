import {
  POST_DELETED,
  GET_POST_ERROR,
  GET_POST_SUCCESS,
  SEND_POST,
  COMMENT_CREATED_ERROR,
} from "../constants/postConstants";

export const getPostReducers = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POST_SUCCESS:
      return {
        posts: action.payload,
      };
    case GET_POST_ERROR:
      return {
        error: action.payload,
      };
    case SEND_POST:
      return {
        posts: [action.payload, ...state.posts],
      };
    case POST_DELETED:
      return {
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case COMMENT_CREATED_ERROR:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
