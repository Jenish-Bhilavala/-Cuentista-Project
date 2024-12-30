const express = require('express');
const app = express();
const path = require('path');
const { connectDB } = require('./app/helpers/db');
require('dotenv').config();

const cors = require('cors');
app.use(cors());
connectDB();

app.use(express.static(path.join(__dirname, 'app', 'public')));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/', require('./app/routes/route.js'));

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

module.exports = app;
