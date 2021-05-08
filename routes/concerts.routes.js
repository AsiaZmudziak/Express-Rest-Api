const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

//returns the entire contents of the array
router.route('/concerts').get((req, res) => {
  return res.json(db.concerts);
});

//returns a random element from an array
router.route('/concerts/random').get((req, res) => {
  const randomRecord =
    db.concerts[Math.floor(Math.random() * db.concerts.length)];
  return res.json(randomRecord);
});

//returns only one element of the array, matching: id
router.route('/concerts/:id').get((req, res) => {
  const id = req.params.id;

  for (let record of db.concerts) {
    if (record.id == id) {
      return res.json(record);
    }
  }
});

//add a new element to the array
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  const newRecord = {
    id: uuidv4(),
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image
  };
  db.concerts.push(newRecord);

  return res.json({ message: 'OK' });
});

//edit array element
router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = req.params.id;

  for (let record of db.concerts) {
    if (record.id == id) {
      record.performer = performer;
      record.genre = genre;
      record.price = price;
      record.day = day;
      record.image = image;
    }
  }

  return res.json({ message: 'OK' });
});

//removes an element from the array, matching: id
router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;

  for (let record of db.concerts) {
    if (record.id == id) {
      db.concerts.splice(db.concerts.indexOf(record), 1);;
    }
  }

  return res.json({ message: 'OK' });
});

module.exports = router;