const createError = require("http-errors");
const User = require("../models/users.model");

// -------------------------------
// Register users
// -------------------------------
module.exports.register_post = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const doesExist = await User.findOne({ email: email });
    if (doesExist)
      throw createError.Conflict(
        `The user with email: ${email}, has already been registered`
      );

    //register new user
    const user = new User({
      email,
      password,
    });

    //save user details to database
    const savedUser = await user.save();
    res.status(201).json("User has been registered successfully");
  } catch (error) {
    next(error);
  }
};

// -------------------------------
// Login users
// -------------------------------

module.exports.login_post = async (req, res, next) => {
  try {
    res.json("Logged in");
  } catch (error) {
    next(error);
  }
};

// -------------------------------
// refresh access tokens
// -------------------------------
module.exports.refresh_get = async (req, res, next) => {
  try {
    res.json("Token has been refreshed");
  } catch (error) {
    next(error);
  }
};

// -------------------------------
// Logout users
// -------------------------------
module.exports.logout_delete = async (req, res, next) => {
  try {
    res.json("User has been logged out");
  } catch (error) {
    next(error);
  }
};
