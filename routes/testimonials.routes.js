const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

//returns the entire contents of the array
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

//returns a random element from an array
router.route('/testimonials/random').get((req, res) => {
  const randomRecord =
    db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomRecord);
});

//returns only one element of the array, matching: id
router.route('/testimonials/:id').get((req, res) => {
  const id = req.params.id;

  for (let record of db.testimonials) {
    if (record.id == id) {
      res.json(record);
    }
  }
});

//add a new element to the array
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  const newRecord = { id: uuidv4(), author: author, text: text };
  db.testimonials.push(newRecord);

  res.json({ message: 'OK' });
});

//edit array element
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;

  for (let record of db.testimonials) {
    if (record.id == id) {
      record.author = author;
      record.text = text;
    }
  }

  res.json({ message: 'OK' });
});

//removes an element from the array, matching: id
router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;

  for (let record of db.testimonials) {
    if (record.id == id) {
      db.testimonials.splice(db.testimonials.indexOf(record));
    }
  }

  res.json({ message: 'OK' });
});

module.exports = router;