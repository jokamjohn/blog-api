/**
 * Truncate a string
 * @param string
 * @returns {*}
 */
export const truncate = string => {
  if (string.length > 5)
    return string.substring(0, 540) + '...';
  else
    return string;
};

/**
 * Change UTC seconds to a readable date: e.g Wed Feb 14 2018
 * @param date
 * @returns {string}
 */
export const date = date => {
  const dateObject = new Date(Date.parse(date));
  return dateObject.toDateString();
};