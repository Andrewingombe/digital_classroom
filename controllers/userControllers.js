// -------------------------------
// Register users
// -------------------------------
module.exports.register_post = async (req, res, next) => {
  try {
    res.json("Registered");
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
