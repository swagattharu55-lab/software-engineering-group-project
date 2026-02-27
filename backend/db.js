const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'foodshare'
});
connection.connect((err) => {
  if (err) { console.error('DB connection error:', err); return; }
  console.log('Connected to MySQL database');
});
module.exports = connection;