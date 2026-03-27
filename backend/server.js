const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const db = require('./db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const messageRoutes = require('./routes/messageRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

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

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'foodshare_super_secret_key_cr7',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1 day expiration
}));

// Make session variables (like user info) available to all Pug templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/users', userRoutes);
app.use('/listings', listingRoutes);
app.use('/categories', categoryRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/messages', messageRoutes);
app.use('/requests', requestRoutes);
app.use('/admin', adminRoutes);
app.use('/ratings', ratingRoutes);
app.use('/settings', settingsRoutes);
app.use('/', authRoutes);

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
//- Server integrations initialized
