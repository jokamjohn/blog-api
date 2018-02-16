import {GET_ONE_POST_SUCCESSFULLY, GET_POSTS_SUCCESSFULLY} from "../actionTypes/actionsTypes";
import {getPostBySlug, getPosts} from "../../api/postsAPI";

/**
 * Action to add posts to state
 * @param posts
 * @returns {{type, posts: *}}
 */
export const addPosts = posts => ({
  type: GET_POSTS_SUCCESSFULLY,
  posts
});

/**
 * Async action to get blog posts from the api.
 * @returns {function(*): Promise<T | void>}
 */
export const getBlogPosts = () => dispatch => getPosts()
    .then(response => dispatch(addPosts(response.data)))
    .catch(err => console.log('Getting posts', err));

/**
 * Action to add a post.
 * @param post
 * @returns {{type, post: *}}
 */
export const addPost = post => ({
  type: GET_ONE_POST_SUCCESSFULLY,
  post
});

/**
 * Async action to get a blog post from the api.
 * @param slug
 * @returns {function(*): Promise<T | void>}
 */
export const getBlogPost = slug => dispatch => getPostBySlug(slug)
    .then(response => dispatch(addPost(response.data)))
    .catch(err => console.log('Getting post ', err));