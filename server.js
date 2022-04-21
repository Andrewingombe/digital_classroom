const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verifyAccessToken } = require("./helpers/jwt_helpers");
require("dotenv").config();
require("./config/db");

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
app.use(cookieParser());
app.use(cors());

// -------------------------------
// Routes
// -------------------------------
app.use("/auth", authRoutes);
app.get("/", verifyAccessToken, async (req, res, next) => {
  res.status(200).send("<h1>This is a private Page</h1>");
});

// -------------------------------
// Error handlers
// -------------------------------
app.use(async (req, res, next) => {
  next(createError.NotFound("Page has not been found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// -------------------------------
// Ports
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`serve at http://localhost:${PORT}`);
});
