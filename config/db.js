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
// Mongoose call backs
// -------------------------------
mongoose.connection.on("connected", () => {
  console.log("Mongoose has been connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose has been disconnected from MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
