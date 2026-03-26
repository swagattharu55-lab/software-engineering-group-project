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
}

module.exports = User;
