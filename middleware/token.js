"use strict";

const jwt = require("jsonwebtoken");

const config = {
  secret: process.env.SECRET_KEY,
  life: process.env.JWT_LIFE
};

const checkToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Handle token presented as a Bearer token in the Authorization header
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    // Handle token presented as URI param
    return req.query.token;
  } else if (req.cookies && req.cookies.token) {
    // Handle token presented as a cookie parameter
    return req.cookies.token;
  }
  // If we return null, we couldn't find a token.
  // In this case, the JWT middleware will return a 401 (unauthorized) to the client for this request
  return null;
};

module.exports = (req, res, next) => {
  const token = checkToken(req);

  // Check if valid token.
  if (!token)
    return res.status(200).json({ error: true, msg: "No token provided." });

  // Verify and renew token.
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res.status(401).json({ error: true, msg: "Unauthorized Access." });

    req.token = jwt.sign({ id: decoded.id + decoded.username }, config.secret, {
      expiresIn: config.life
    });

    next();
  });
};
