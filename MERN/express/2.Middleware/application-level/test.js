
const express = require('express');
const app = express();

// Application-level middleware
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  next(); // passes control to next middleware or route handler
});

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.use('/admin', (req, res, next) => {
  console.log('Accessing admin routes...');
  next();
});

app.get('/admin/dashboard', (req, res) => {
  res.send('Welcome to admin dashboard');
});


app.listen(3000, () => console.log('Server running on port 3000'));
