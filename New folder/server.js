const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const admissionRouter = require('./routes/admission');
const contactRouter = require('./routes/contact');
const careerRouter = require('./routes/career');

app.use('/api/admission', admissionRouter);
app.use('/api/contact', contactRouter);
app.use('/api/career', careerRouter);

// Serve HTML pages
const pages = ['index', 'about', 'academics', 'admission-procedure', 'online-admission', 'events', 'career', 'contact'];

pages.forEach(page => {
  const route = page === 'index' ? '/' : `/${page}`;
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', `${page}.html`));
  });
});

app.listen(PORT, () => {
  console.log(`✅ Azeezia School server running at http://localhost:${PORT}`);
});
