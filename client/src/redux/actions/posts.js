import {
  ADD_COMMENT_TO_POST, ADD_POST,
  DELETE_COMMENT_ACTION_SUCCESSFULLY, DELETE_POST_ACTION_SUCCESSFULLY, EDIT_COMMENT, GET_ONE_POST_SUCCESSFULLY,
  GET_POSTS_SUCCESSFULLY
} from "../actionTypes/actionsTypes";
import {addPost, deletePost, getPostBySlug, getPosts} from "../../api/postsAPI";
import {addComment, deleteComment, editComment} from "../../api/commentsAPI";
import {logout} from "./auth";

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
export const addPostToState = post => ({
  type: GET_ONE_POST_SUCCESSFULLY,
  post
});

/**
 * Async action to get a blog post from the api.
 * @param slug
 * @returns {function(*): Promise<T | void>}
 */
export const getBlogPost = slug => dispatch => getPostBySlug(slug)
    .then(response => dispatch(addPostToState(response.data)))
    .catch(err => console.log('Getting post ', err));

/**
 * Action to delete a comment from the post
 * @returns {{type}}
 */
const delComment = () => ({
  type: DELETE_COMMENT_ACTION_SUCCESSFULLY

});

/**
 * Async action to delete a comment from the api.
 * @param slug
 * @param commentId
 * @returns {function(*): Promise<T | void>}
 */
export const deleteCommentFromAPI = (slug, commentId) => dispatch => deleteComment(slug, commentId)
    .then(() => dispatch(delComment()))
    .then(() => dispatch(getBlogPost(slug)))
    .catch(err => {
      if (err.response) {
        if (err.response.status === 400) return dispatch(logout(false));
        return;
      }
    });

/**
 * Action to delete a post
 * @returns {{type}}
 */
const delPost = () => ({
  type: DELETE_POST_ACTION_SUCCESSFULLY
});

/**
 * Async action to delete a post.
 * @param slug
 * @returns {function(*): Promise<(function(*): Promise<(function(*): Promise<T|void>)|void>) | void>}
 */
export const deletePostFromAPI = slug => dispatch => deletePost(slug)
    .then(() => dispatch(delPost()))
    .then(() => dispatch(getBlogPosts()))
    .catch(err => {
      if (err.response) {
        if (err.response.status === 400) return dispatch(logout(false));
        return;
      }
    });

/**
 * Action to add an item
 * @returns {{type}}
 */
const createComment = () => ({
  type: ADD_COMMENT_TO_POST
});

/**
 * Async action to add comment to the api.
 * @param slug
 * @param comment
 * @returns {function(*): Promise<T | void>}
 */
export const addCommentToAPI = (slug, comment) => dispatch => addComment(slug, comment)
    .then(() => dispatch(createComment()))
    .then(() => dispatch(getBlogPost(slug)))
    .catch(err => {
      if (err.response) {
        if (err.response.status === 400) return dispatch(logout(false));
        return;
      }
    });

/**
 * Action to add posts.
 * @returns {{type}}
 */
const createPost = () => ({
  type: ADD_POST
});

/**
 * Async action to add a post to the api.
 * @param post
 * @returns {function(*): (Promise|*|Promise<T | void>)}
 */
export const addPostToAPI = post => dispatch => addPost(post)
    .then(() => dispatch(createPost()))
    .catch(err => console.log('error adding post', err));

/**
 *
 * @returns {{type}}
 */
const editCommentInApp = post => ({
  type: EDIT_COMMENT,
  post
});

/**
 * Send the updated comment body to the API.
 * @param comment Comment object {body: <text>}
 * @param slug Post slug
 * @param commentId comment Id
 * @returns {function(*): Promise<T | void>}
 */
export const editCommentOnAPI = (comment, slug, commentId) => dispatch => editComment(slug, commentId, comment)
    .then(res => dispatch(editCommentInApp(res.data)))
    .catch(err => {
      if (err.response) {
        if (err.response.status === 400) return dispatch(logout(false));
        return;
      }
    });