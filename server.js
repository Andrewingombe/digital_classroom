const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

// -------------------------------
// Initialise express app
// -------------------------------
const app = express();

// -------------------------------
// Middleware
// -------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// -------------------------------
// Routes
// -------------------------------
app.get("/", (req, res, next) => {
  res.status(200).json("Hello from express");
});

// -------------------------------
// Ports
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`serve at http://localhost:${PORT}`);
});
