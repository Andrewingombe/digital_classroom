const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// -------------------------------
// Create access token
// -------------------------------
const createAccessToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.ACCESSTOKEN_SECRET,
      { expiresIn: "1m" },
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
const verifyAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies;
    console.log(refreshToken);
    next();
  } catch (error) {
    next(error);
  }
};

// -------------------------------
// Create refresh access token
// -------------------------------
const createRefreshToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.REFRESHTOKEN_SECRET,
      { expiresIn: "1y" },
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
