const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/admissions.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

router.post('/submit', (req, res) => {
  try {
    const admissions = readData();
    const entry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      student: {
        name: req.body.studentName,
        dob: req.body.dob,
        gender: req.body.gender,
        nationality: req.body.nationality,
        religion: req.body.religion,
        applyingClass: req.body.applyingClass,
        previousSchool: req.body.previousSchool,
        previousClass: req.body.previousClass,
        bloodGroup: req.body.bloodGroup,
      },
      guardian: {
        fatherName: req.body.fatherName,
        fatherOccupation: req.body.fatherOccupation,
        fatherPhone: req.body.fatherPhone,
        fatherEmail: req.body.fatherEmail,
        motherName: req.body.motherName,
        motherOccupation: req.body.motherOccupation,
        motherPhone: req.body.motherPhone,
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
      },
      academic: {
        lastClassPercentage: req.body.lastClassPercentage,
        extraCurricular: req.body.extraCurricular,
        achievements: req.body.achievements,
        medicalConditions: req.body.medicalConditions,
        howDidYouHear: req.body.howDidYouHear,
      }
    };
    admissions.push(entry);
    writeData(admissions);
    res.json({ success: true, message: 'Admission form submitted successfully! We will contact you within 3 working days.', id: entry.id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
