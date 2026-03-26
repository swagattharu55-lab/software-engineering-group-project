const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', userRoutes);
app.use('/listings', listingRoutes);
app.use('/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.redirect('/listings');
});

app.get('/db-test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Database connected!', solution: rows[0].solution });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
