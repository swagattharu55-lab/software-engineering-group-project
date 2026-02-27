CREATE DATABASE IF NOT EXISTS foodshare;
USE foodshare;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  location VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 1,
  expiry_date DATE,
  status VARCHAR(20) DEFAULT 'available',
  category_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  requester_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listing_id) REFERENCES listings(id),
  FOREIGN KEY (requester_id) REFERENCES users(id)
);

INSERT IGNORE INTO categories (name) VALUES
('Fruit'),('Vegetables'),('Dairy'),('Bakery'),('Canned'),('Cooked Food'),('Drinks');

INSERT IGNORE INTO users (name, email, password_hash, location) VALUES
('Sarah Smith', 'sarah@email.com', 'hashedpass1', 'London'),
('Ahmed Ali', 'ahmed@email.com', 'hashedpass2', 'London'),
('Swagat KC', 'swagat@email.com', 'hashedpass3', 'London'),
('Aayusha Thapa', 'aayusha@email.com', 'hashedpass4', 'London');

INSERT IGNORE INTO listings (user_id, title, description, quantity, expiry_date, status, category_id) VALUES
(1, 'Fresh Apples', 'Surplus apples from garden, still fresh', 10, '2026-03-10', 'available', 1),
(1, 'Homemade Bread', 'Extra loaf baked today, wholemeal', 2, '2026-03-01', 'available', 4),
(2, 'Tinned Tomatoes', 'Bought too many tins', 5, '2027-01-01', 'available', 5),
(2, 'Cooked Rice', 'Freshly cooked white rice, plenty left', 3, '2026-02-28', 'available', 6),
(3, 'Carrots', 'Fresh carrots from local market', 8, '2026-03-05', 'available', 2),
(4, 'Milk', 'Full fat milk, unopened', 2, '2026-03-02', 'available', 3);