const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/contacts.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

router.post('/submit', (req, res) => {
  try {
    const contacts = readData();
    const entry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
    };
    contacts.push(entry);
    writeData(contacts);
    res.json({ success: true, message: 'Thank you for contacting us! We will respond within 24 hours.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
