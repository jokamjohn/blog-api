/**
 * CORS middleware.
 * @param req
 * @param res
 * @param next
 * @returns {*|JSON|Promise<any>}
 */
module.exports.CORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");//Allow all domains to access the api
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //Headers allowed ina request
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE"); //Methods allowed
    return res.status(200).json({});
  }
  else {
    next()
  }
};