const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const listingRoutes = require('./routes/listings');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/listings', listingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));