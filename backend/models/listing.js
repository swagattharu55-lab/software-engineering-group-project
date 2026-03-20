const db = require('../services/db');

class Listing {
    id;
    title;
    description;
    quantity;
    expiry_date;
    status;
    category_id;
    category;
    user_name;
    location;
    user_email;

    constructor(id) {
        this.id = id;
    }

    async getListingDetails() {
        var sql = `SELECT listings.*, users.name as user_name, users.location,
               users.email as user_email, categories.name as category
               FROM listings
               JOIN users ON listings.user_id = users.id
               LEFT JOIN categories ON listings.category_id = categories.id
               WHERE listings.id = ?`;
        const results = await db.query(sql, [this.id]);
        if (results[0]) {
            this.title = results[0].title;
            this.description = results[0].description;
            this.quantity = results[0].quantity;
            this.expiry_date = results[0].expiry_date;
            this.status = results[0].status;
            this.category_id = results[0].category_id;
            this.category = results[0].category;
            this.user_name = results[0].user_name;
            this.location = results[0].location;
            this.user_email = results[0].user_email;
        }
    }

    static async getAllListings(categoryId) {
        let sql = `SELECT listings.*, users.name as user_name, users.location,
               categories.name as category
               FROM listings
               JOIN users ON listings.user_id = users.id
               LEFT JOIN categories ON listings.category_id = categories.id`;
        const params = [];
        if (categoryId) {
            sql += ' WHERE listings.category_id = ?';
            params.push(categoryId);
        }
        sql += ' ORDER BY listings.created_at DESC';
        return await db.query(sql, params);
    }

    static async createListing(userId, title, description, quantity, expiry_date, category_id) {
        var sql = 'INSERT INTO listings (user_id, title, description, quantity, expiry_date, category_id) VALUES (?,?,?,?,?,?)';
        await db.query(sql, [userId, title, description, quantity, expiry_date, category_id]);
    }

    async updateCategory(categoryId) {
        var sql = "UPDATE listings SET category_id = ? WHERE id = ?";
        await db.query(sql, [categoryId, this.id]);
        this.category_id = categoryId;
    }
}

module.exports = { Listing };
