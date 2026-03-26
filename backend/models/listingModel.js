const db = require('../db');

class Listing {
  static async getAllActive() {
    const query = `
      SELECT l.*, u.name as user_name, c.name as category_name 
      FROM listings l 
      JOIN users u ON l.user_id = u.id 
      JOIN categories c ON l.category_id = c.id
      WHERE l.is_active = TRUE
      ORDER BY l.created_at DESC
    `;
    const [rows] = await db.query(query);
    return rows;
  }

  static async getById(id) {
    const query = `
      SELECT l.*, u.name as user_name, c.name as category_name 
      FROM listings l 
      JOIN users u ON l.user_id = u.id 
      JOIN categories c ON l.category_id = c.id
      WHERE l.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
  }

  static async getByCategoryId(categoryId) {
    const query = `
      SELECT l.*, u.name as user_name, c.name as category_name 
      FROM listings l 
      JOIN users u ON l.user_id = u.id 
      JOIN categories c ON l.category_id = c.id
      WHERE l.category_id = ? AND l.is_active = TRUE
      ORDER BY l.created_at DESC
    `;
    const [rows] = await db.query(query, [categoryId]);
    return rows;
  }
}

module.exports = Listing;
