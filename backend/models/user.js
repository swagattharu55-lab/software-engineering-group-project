const db = require('../services/db');

class User {
    id;
    name;
    email;
    location;
    note;
    listings = [];

    constructor(id) {
        this.id = id;
    }

    async getUserDetails() {
        if (typeof this.name !== 'string') {
            var sql = "SELECT * FROM users WHERE id = ?";
            const results = await db.query(sql, [this.id]);
            this.name = results[0].name;
            this.email = results[0].email;
            this.location = results[0].location;
            this.note = results[0].note;
        }
    }

    async getUserListings() {
        var sql = `SELECT listings.*, categories.name as category
               FROM listings
               LEFT JOIN categories ON listings.category_id = categories.id
               WHERE listings.user_id = ?
               ORDER BY listings.created_at DESC`;
        const results = await db.query(sql, [this.id]);
        this.listings = results;
    }

    async addUserNote(note) {
        var sql = "UPDATE users SET note = ? WHERE id = ?";
        await db.query(sql, [note, this.id]);
        this.note = note;
    }

    static async createUser(name, email, passwordHash, dob, mobile) {
        var sql = "INSERT INTO users (name, email, password_hash, dob, mobile) VALUES (?, ?, ?, ?, ?)";
        const result = await db.query(sql, [name, email, passwordHash, dob, mobile]);
        return result.insertId;
    }
}

module.exports = { User };
