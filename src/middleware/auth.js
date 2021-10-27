const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  console.log("REQ: ", req.headers);

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for the authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.userId = decoded;
  } catch (error) {
    return res.status(401).send("INVALID JWT TOKEN");
  }

  return next();
};

module.exports = verifyToken;
