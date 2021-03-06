const createError = require("http-errors");
const User = require("../models/users.model");
const {
  createAccessToken,
  createRefreshToken,
} = require("../helpers/jwt_helpers");
const { authSchema } = require("../helpers/schemaValidation");

//calculate max age for cookie
const maxAge = 3 * 24 * 60 * 60;

// -------------------------------
// Register users
// -------------------------------
module.exports.register_post = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const doesExist = await User.findOne({ email: email });
    if (doesExist)
      throw createError.Conflict(
        `The user with email: ${email}, has already been registered`
      );

    //register new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    //save user details to database
    const savedUser = await user.save();

    //create access tokens
    const accessToken = await createAccessToken(savedUser.id, savedUser.role);
    const refreshToken = await createRefreshToken(savedUser.id, savedUser.role);

    //save refresh token to the databse with user
    savedUser.refreshToken = refreshToken;
    const result = await savedUser.save();

    //store refresh token in httpOnly cookie
    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

// -------------------------------
// Login users
// -------------------------------

module.exports.login_post = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if the user is already registered
    const user = await User.findOne({ email: email });
    if (!user)
      throw createError.NotFound(
        `User with email: ${email}, has not been registered`
      );

    //Verify password given by the user
    const isValid = await user.validatePassowrd(password);
    if (!isValid) throw createError.Unauthorized("Invalid email/password");

    //create access tokens
    const accessToken = await createAccessToken(user.id, user.role);
    const refreshToken = await createRefreshToken(user.id, user.role);

    //save refresh token to the databse with user
    user.refreshToken = refreshToken;
    const result = await user.save();

    //store refresh token in httpOnly cookie
    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true)
      return createError.BadRequest("Invalid email/password");
    next(error);
  }
};

// -------------------------------
// refresh access tokens
// -------------------------------
module.exports.refresh_get = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.jwt;
    res.json({ refreshToken });
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
