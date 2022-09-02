// Import the Express library.
const express = require("express");
const path = require("path");
const apiRouter = require("./routes/apiRoutes.js");
const htmlRouter = require("./routes/htmlRoutes.js");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRouter);
app.use("/", htmlRouter);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`APP listenening at http://localhost:${PORT}`)
);
