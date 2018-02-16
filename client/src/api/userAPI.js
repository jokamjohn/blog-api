import {post} from "./api";

/**
 * Login ina use via the api
 * @param data
 * @returns {*|AxiosPromise<any>}
 */
export const loginUser = data => post('/auth/login', data);

/**
 * Register a user via the api
 * @param data
 * @returns {*|AxiosPromise<any>}
 */
export const registerUser = data => post('/auth/register', data);
