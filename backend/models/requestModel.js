const db = require('../db');

class Request {
  static async create(listingId, requesterId) {
    const [result] = await db.query(
      'INSERT INTO requests (listing_id, requester_id) VALUES (?, ?)',
      [listingId, requesterId]
    );
    return result.insertId;
  }

  static async getByOwnerId(ownerId) {
    const query = `
      SELECT r.*, l.title as listing_title, u.name as requester_name 
      FROM requests r
      JOIN listings l ON r.listing_id = l.id
      JOIN users u ON r.requester_id = u.id
      WHERE l.user_id = ?
      ORDER BY r.created_at DESC
    `;
    const [rows] = await db.query(query, [ownerId]);
    return rows;
  }

  static async getByRequesterId(requesterId) {
    const query = `
      SELECT r.*, l.title as listing_title, u.name as owner_name 
      FROM requests r
      JOIN listings l ON r.listing_id = l.id
      JOIN users u ON l.user_id = u.id
      WHERE r.requester_id = ?
      ORDER BY r.created_at DESC
    `;
    const [rows] = await db.query(query, [requesterId]);
    return rows;
  }

  static async updateStatus(requestId, status) {
    await db.query('UPDATE requests SET status = ? WHERE id = ?', [status, requestId]);
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM requests WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Request;
