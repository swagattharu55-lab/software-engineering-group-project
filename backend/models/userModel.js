const db = require('../db');

class User {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async getByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(name, email, password, location) {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)',
      [name, email, password, location]
    );
    return result.insertId;
  }
}

module.exports = User;
