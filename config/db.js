const mongoose = require("mongoose");

// -------------------------------
// Connect to database
// -------------------------------
mongoose
  .connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("MongoDB has been connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

// -------------------------------
// Mngoose call backs
// -------------------------------
