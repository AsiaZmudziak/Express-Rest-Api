const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

//returns the entire contents of the array
router.route('/seats').get((req, res) => {
  return res.json(db.seats);
});

//returns a random element from an array
router.route('/seats/random').get((req, res) => {
  const randomRecord = db.seats[Math.floor(Math.random() * db.seats.length)];
  return res.json(randomRecord);
});

//returns only one element of the array, matching: id
router.route('/seats/:id').get((req, res) => {
  const id = req.params.id;

  for (let record of db.seats) {
    if (record.id == id) {
      return res.json(record);
    }
  }
});

//add a new element to the array
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const availability = true;

  for (let record of db.seats) {
    if (record.day === day && record.seat === seat) {
      res.status(405).json({ message: 'The slot is already taken...' });
      availability = false;
    }
  }

  if (availability === true) {
    const newRecord = {
      id: uuidv4(),
      day: day,
      seat: seat,
      client: client,
      email: email
    };
    db.seats.push(newRecord);
    req.io.emit('seatsUpdated', db.seats);

    return res.json({ message: 'OK' });
  }
});

//edit array element
router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = req.params.id;

  for (let record of db.seats) {
    if (record.id == id) {
      record.day = day;
      record.seat = seat;
      record.client = client;
      record.email = email;
    }
  }

  return res.json({ message: 'OK' });
});

//removes an element from the array, matching: id
router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;

  for (let record of db.seats) {
    if (record.id == id) {
      db.seats.splice(db.seats.indexOf(record), 1);
    }
  }

  return res.json({ message: 'OK' });
});

module.exports = router;