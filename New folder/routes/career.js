const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/careers.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

router.post('/apply', (req, res) => {
  try {
    const careers = readData();
    const entry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      qualification: req.body.qualification,
      experience: req.body.experience,
      message: req.body.message,
    };
    careers.push(entry);
    writeData(careers);
    res.json({ success: true, message: 'Your application has been received. We will review and contact you shortly.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
