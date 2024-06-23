// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/royalEnfieldDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Mongoose schemas
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  bike: String
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Booking = mongoose.model('Booking', bookingSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.post('/book', (req, res) => {
  const newBooking = new Booking({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    bike: req.body.bike
  });
  newBooking.save((err) => {
    if (err) {
      res.status(500).send('Error saving booking.');
    } else {
      res.status(200).send('Booking successful!');
    }
  });
});

app.post('/contact', (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });
  newContact.save((err) => {
    if (err) {
      res.status(500).send('Error saving contact message.');
    } else {
      res.status(200).send('Message sent successfully!');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
