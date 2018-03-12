import {post, put, del} from "./api";
import {getTokenConfig} from "../utils/authService";

/**
 * Add a comment to a post via the api.
 * @param slug
 * @param comment
 * @returns {*|AxiosPromise<any>}
 */
export const addComment = (slug, comment) => post(`posts/${slug}/comments`, comment, getTokenConfig());

/**
 * Edit comment via the api.
 * @param slug
 * @param commentId
 * @param comment
 * @returns {*|AxiosPromise<any>}
 */
export const editComment = (slug, commentId, comment) => put(`posts/${slug}/comments/${commentId}`, comment, getTokenConfig());

/**
 * Delete a comment via the api.
 * @param slug
 * @param commentId
 * @param comment
 * @returns {AxiosPromise|boolean|Promise<boolean>|void|IDBRequest}
 */
export const deleteComment = (slug, commentId) => del(`posts/${slug}/comments/${commentId}`, getTokenConfig());