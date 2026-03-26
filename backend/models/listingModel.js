const db = require('../db');

class Listing {
  static async getAllActive(search = '', location = '') {
    let query = `
      SELECT l.*, u.name as user_name, c.name as category_name 
      FROM listings l 
      JOIN users u ON l.user_id = u.id 
      JOIN categories c ON l.category_id = c.id
      WHERE l.status = 'available'
    `;
    const queryParams = [];

    if (search) {
      query += ` AND l.title LIKE ?`;
      queryParams.push(`%${search}%`);
    }

    if (location) {
      query += ` AND l.location LIKE ?`;
      queryParams.push(`%${location}%`);
    }

    query += ` ORDER BY l.created_at DESC`;
    const [rows] = await db.query(query, queryParams);
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
      WHERE l.category_id = ? AND l.status = 'available'
      ORDER BY l.created_at DESC
    `;
    const [rows] = await db.query(query, [categoryId]);
    return rows;
  }
  static async getByUserId(userId) {
    const query = `
      SELECT l.*, c.name as category_name 
      FROM listings l 
      JOIN categories c ON l.category_id = c.id
      WHERE l.user_id = ?
      ORDER BY l.created_at DESC
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
  }

  static async create(listingData) {
    const { user_id, title, description, category_id, quantity, location, image_url, expiry_date } = listingData;
    const [result] = await db.query(
      'INSERT INTO listings (user_id, title, description, category_id, quantity, location, image_url, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, title, description, category_id, quantity, location, image_url, expiry_date]
    );
    return result.insertId;
  }

  static async delete(id, userId) {
    const [result] = await db.query('DELETE FROM listings WHERE id = ? AND user_id = ?', [id, userId]);
    return result.affectedRows > 0;
  }
}

module.exports = Listing;
