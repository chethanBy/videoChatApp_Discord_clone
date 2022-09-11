const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res.status(403).send("token is required");
  }
  try {
    token = token.replace(/^Bearer\s+/, "");
    jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.send("token expired or invalid token");
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

module.exports = verifyToken;
