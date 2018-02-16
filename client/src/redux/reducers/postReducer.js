import initialState from "../initialState";
import {GET_ONE_POST_SUCCESSFULLY, GET_POSTS_SUCCESSFULLY} from "../actionTypes/actionsTypes";

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
    default:
      return state
  }
}