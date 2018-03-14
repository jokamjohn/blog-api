import axios from 'axios';

let api = null;

/**
 * This returns the intialized api
 * @returns {*}
 */
const getInitializedApi = () => {
  if (api) return api;
  return (api = axios.create({
    baseURL: getBaseUrl(),
    responseType: 'json'
  }));
};

/**
 *
 * @returns {string}
 */
const getBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  return `${baseUrl}/api/v1/`;
};

/**
 * Get method on the axios instance
 * @param url
 * @param config
 */
export const get = (url, config = null) => getInitializedApi().get(url, config);

/**
 * Post method on the axios instance.
 * @param url
 * @param data
 * @param config
 * @returns {*|AxiosPromise<any>}
 */
export const post = (url, data, config = null) => getInitializedApi().post(url, data, config);

/**
 * Put method on the axios instance
 * @param url
 * @param data
 * @param config
 * @returns {AxiosPromise<any> | IDBRequest | Promise<void>}
 */
export const put = (url, data, config = null) => getInitializedApi().put(url, data, config);

/**
 * Delete method on the axios instance
 * @param url
 * @param config
 * @returns {AxiosPromise | boolean | Promise<boolean> | void | IDBRequest}
 */
export const del = (url, config = null) => getInitializedApi().delete(url, config);

