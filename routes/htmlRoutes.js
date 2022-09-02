const app = require("express").Router();
const path = require("path");

// Getting the path request and sending to file for response.
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);
module.exports = app;