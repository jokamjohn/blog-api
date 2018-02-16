import {get, post, put, del} from "./api";
import {getTokenConfig} from "../utils/authService";

/**
 * Get all posts from the database.
 * @returns {*}
 */
export const getPosts = () => get('/posts');

/**
 * Get a post by a slug.
 * @param slug
 * @returns {*}
 */
export const getPostBySlug = slug => get(`/posts/${slug}`);

/**
 * Add a post to the application.
 * @param data
 * @returns {*|AxiosPromise<any>}
 */
export const addPost = data => post('/posts', data, getTokenConfig());

/**
 * Edit a post in the application.
 * @param slug
 * @param post
 * @returns {AxiosPromise<any>|IDBRequest|Promise<void>}
 */
export const editPost = (slug, post) => put(`posts/${slug}`, post, getTokenConfig());

/**
 * Delete a post in the application.
 * @param slug
 * @returns {AxiosPromise|boolean|Promise<boolean>|void|IDBRequest}
 */
export const deletePost = slug => del(`/posts/${slug}`, getTokenConfig());
