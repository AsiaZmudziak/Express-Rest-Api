const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

//returns the entire contents of the array
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

//returns a random element from an array
router.route('/seats/random').get((req, res) => {
  const randomRecord = db.seats[Math.floor(Math.random() * db.seats.length)];
  res.json(randomRecord);
});

//returns only one element of the array, matching: id
router.route('/seats/:id').get((req, res) => {
  const id = req.params.id;

  for (let record of db.seats) {
    if (record.id == id) {
      res.json(record);
    }
  }
});

//add a new element to the array
router.route('/seats').post((req, res) => {
  const { author, text } = req.body;

  const newRecord = { id: uuidv4(), author: author, text: text };
  db.seats.push(newRecord);

  res.json({ message: 'OK' });
});

//edit array element
router.route('/seats/:id').put((req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;

  for (let record of db.seats) {
    if (record.id == id) {
      record.author = author;
      record.text = text;
    }
  }

  res.json({ message: 'OK' });
});

//removes an element from the array, matching: id
router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;

  for (let record of db.seats) {
    if (record.id == id) {
      db.seats.splice(db.seats.indexOf(record));
    }
  }

  res.json({ message: 'OK' });
});

module.exports = router;