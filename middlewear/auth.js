const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //Get token from header
  const token = req.header("x-auth-token");

  // check if token exists
  if (!token) {
    return res.status(401).json({ msg: "no token authorization denied" });
  }

  //verify token

  try {
    // decoding the token which we received from header
    const decoded = jwt.verify(token, config.get("JWTSecretKey"));
    // Here we r setting req.user value to decoded.user,
    // Where decoded.user value is same as the payload.
    // User which contains user id details
    req.user = decoded.user;
    next();
  } catch (error) {
    // token is available and not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};
