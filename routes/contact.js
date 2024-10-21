const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST route to submit a contact request
router.post('/', async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  // Basic validation
  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newContact = new Contact({ fullName, email, phone, message });
    await newContact.save();
    res.status(201).json({ message: 'Your message has been sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// GET route to retrieve all contact requests
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// GET route to retrieve a contact request by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact request not found.' });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

module.exports = router;
