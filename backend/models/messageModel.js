const db = require('../db');

class Message {
  static async getByUserId(userId) {
    const query = `
      SELECT m.*, u.name as sender_name, l.title as listing_title
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      LEFT JOIN listings l ON m.listing_id = l.id
      WHERE m.receiver_id = ?
      ORDER BY m.created_at DESC
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
  }

  static async create(senderId, receiverId, listingId, content) {
    const [result] = await db.query(
      'INSERT INTO messages (sender_id, receiver_id, listing_id, content) VALUES (?, ?, ?, ?)',
      [senderId, receiverId, listingId, content]
    );
    return result.insertId;
  }
}

module.exports = Message;
