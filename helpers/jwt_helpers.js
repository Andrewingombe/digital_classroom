const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// -------------------------------
// Create access token
// -------------------------------
const createAccessToken = (id, role) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id, role },
      process.env.ACCESSTOKEN_SECRET,
      { expiresIn: "5m" },
      (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      }
    );
  });
};

// -------------------------------
// Verify access token
// -------------------------------
const verifyAccessToken = (req, res, next) => {
  //Check if bearer  token exits
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  //verify access token
  jwt.verify(token, process.env.ACCESSTOKEN_SECRET, (err, decoded) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return createError.Unauthorized(message);
    }

    req.user = decoded;
    next();
  });
};

// -------------------------------
// Create refresh access token
// -------------------------------
const createRefreshToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.REFRESHTOKEN_SECRET,
      { expiresIn: "3d" },
      (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
};
