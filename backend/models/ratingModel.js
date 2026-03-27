const db = require('../db');

class Rating {
  static async create(raterId, ratedId, requestId, score, review) {
    const [result] = await db.query(
      'INSERT INTO ratings (rater_id, rated_id, request_id, score, review) VALUES (?, ?, ?, ?, ?)',
      [raterId, ratedId, requestId, score, review]
    );
    return result.insertId;
  }

  static async getAverageForUser(userId) {
    const [rows] = await db.query('SELECT AVG(score) as avgScore, COUNT(*) as reviewCount FROM ratings WHERE rated_id = ?', [userId]);
    return rows[0];
  }
}
module.exports = Rating;
//- Rating aggregation logic
