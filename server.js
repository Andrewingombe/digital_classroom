const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.status(200).json("Hello from express");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`serve at http://localhost:${PORT}`);
});
