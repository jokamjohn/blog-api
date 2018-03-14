import {isLoggedIn} from "../utils/authService";

export default {
  auth: {
    isLoggedIn: isLoggedIn() || false
  },
  blog: {
    posts: [],
    post: {}
  }
};