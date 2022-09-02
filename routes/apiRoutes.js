const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);



router.get("/notes", (req, res) => {
    readFileAsync("./db/db.json", "utf-8").then((data) => {
      notes = [].concat(JSON.parse(data));
      res.json(notes);
    });
  });

router.post('/notes', (req, res) => {
  const note = req.body;
  readFileAsync('./db/db.json').then((data) => {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
    return notes;
  })
  .then((notes) => {
    writeToFile('./db/db.json', JSON.stringify(notes))
    res.json(notes);
})
});

router.delete('/api/notes/:id', (req, res) => {
  // reading notes form db.json
  let db = JSON.parse(fs.readFileSync('db/db.json'))
  // removing note with id
  let deleteNotes = db.filter(item => item.id !== req.params.id);
  // Rewriting note to db.json
  fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
  res.json(deleteNotes);
  
})

module.exports = router;