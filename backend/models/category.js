const db = require('../services/db');

class Category {
    id;
    name;

    constructor(id) {
        this.id = id;
    }

    static async getAllCategories() {
        var sql = "SELECT * FROM categories";
        return await db.query(sql, []);
    }
}

module.exports = { Category };
