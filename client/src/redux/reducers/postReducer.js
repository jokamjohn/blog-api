import initialState from "../initialState";
import {
  DELETE_COMMENT_ACTION_SUCCESSFULLY, DELETE_POST_ACTION_SUCCESSFULLY, GET_ONE_POST_SUCCESSFULLY,
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
    case DELETE_COMMENT_ACTION_SUCCESSFULLY:
      return state;
    case DELETE_POST_ACTION_SUCCESSFULLY:
      return state;
    default:
      return state
  }
}