CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    points INT DEFAULT 0,
    badges VARCHAR(255) DEFAULT 'Newcomer',
    profile_pic VARCHAR(255) DEFAULT '/images/default-avatar.png',
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
    quantity INT DEFAULT 1,
    location VARCHAR(255),
    image_url VARCHAR(255) DEFAULT '/images/placeholder.jpg',
    expiry_date DATE NOT NULL,
    status ENUM('available', 'pending', 'collected') DEFAULT 'available',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    requester_id INT NOT NULL,
    status ENUM('pending', 'accepted', 'rejected', 'completed') DEFAULT 'pending',
    blockchain_hash VARCHAR(64) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    request_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rater_id INT NOT NULL,
    rated_id INT NOT NULL,
    request_id INT NOT NULL,
    score INT CHECK(score >= 1 AND score <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rater_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (rated_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
);

-- Seed basic data
INSERT IGNORE INTO categories (id, name) VALUES 
(1, 'Fruit & Veg'), (2, 'Bakery'), (3, 'Canned Goods'), (4, 'Meals');

INSERT IGNORE INTO users (id, name, email, password, location, role) VALUES 
(1, 'Sarah', 'sarah@student.uni.ac.uk', '$2b$10$wN3tXX149G9rQZzG7oZ7Iee9A3Wf4rZ3QZ3QZ3QZ3QZ3QZ3QZ3QZ3', 'Student Halls', 'user'),
(2, 'Ahmed', 'ahmed@local.email.com', '$2b$10$wN3tXX149G9rQZzG7oZ7Iee9A3Wf4rZ3QZ3QZ3QZ3QZ3QZ3QZ3QZ3', 'City Centre', 'user'),
(3, 'Admin', 'admin@foodshare.com', '$2b$10$wN3tXX149G9rQZzG7oZ7Iee9A3Wf4rZ3QZ3QZ3QZ3QZ3QZ3QZ3QZ3', 'System', 'admin');
