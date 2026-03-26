const db = require('../db');

class Category {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Category;
