import initialState from "../initialState";
import {
  ADD_COMMENT_TO_POST,
  DELETE_COMMENT_ACTION_SUCCESSFULLY, DELETE_POST_ACTION_SUCCESSFULLY, EDIT_COMMENT, GET_ONE_POST_SUCCESSFULLY,
  GET_POSTS_SUCCESSFULLY
} from "../actionTypes/actionsTypes";

export default function (state = initialState.blog, action) {
  switch (action.type) {
    case GET_POSTS_SUCCESSFULLY:
      return {
        ...state,
        posts: [
          ...action.posts
        ]
      };
    case GET_ONE_POST_SUCCESSFULLY:
      return {
        ...state,
        post: action.post
      };
    case ADD_COMMENT_TO_POST:
      return state;
    case EDIT_COMMENT:
      return state;
    case DELETE_COMMENT_ACTION_SUCCESSFULLY:
      return state;
    case DELETE_POST_ACTION_SUCCESSFULLY:
      return state;
    default:
      return state
  }
}