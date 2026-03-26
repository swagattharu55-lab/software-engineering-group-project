CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT NOT NULL,
    expiry_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Seed Data
INSERT IGNORE INTO users (id, name, email, password, location) VALUES 
(1, 'Sarah', 'sarah@student.uni.ac.uk', 'password123', 'Student Halls'),
(2, 'Ahmed', 'ahmed@local.email.com', 'password123', 'City Centre');

INSERT IGNORE INTO categories (id, name) VALUES 
(1, 'Fruit & Veg'),
(2, 'Bakery'),
(3, 'Canned Goods'),
(4, 'Meals');

INSERT IGNORE INTO listings (id, user_id, title, description, category_id, expiry_date) VALUES 
(1, 1, 'Extra Apples', 'Got too many apples in my grocery delivery.', 1, '2026-03-30'),
(2, 2, 'Fresh Bread', 'Half a loaf of sourdough going spare.', 2, '2026-03-28'),
(3, 1, 'Tomato Soup', 'Two tins, unopened.', 3, '2027-01-01');
