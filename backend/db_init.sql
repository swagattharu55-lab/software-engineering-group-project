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
CREATE TABLE IF NOT EXISTS listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 1,
  expiry_date DATE,
  status VARCHAR(20) DEFAULT 'available',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS listing_categories (
  listing_id INT,
  category_id INT,
  FOREIGN KEY (listing_id) REFERENCES listings(id),
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
INSERT IGNORE INTO users (name, email, password_hash, location) VALUES
('Sarah Smith', 'sarah@email.com', 'hashedpass1', 'London'),
('Ahmed Ali', 'ahmed@email.com', 'hashedpass2', 'London');
INSERT IGNORE INTO categories (name) VALUES
('Fruit'),('Vegetables'),('Dairy'),('Bakery'),('Canned');
INSERT IGNORE INTO listings (user_id, title, description, quantity, expiry_date) VALUES
(1, 'Fresh Apples', 'Surplus apples from garden', 10, '2026-03-05'),
(1, 'Homemade Bread', 'Extra loaf baked today', 2, '2026-03-01'),
(2, 'Tinned Tomatoes', 'Bought too many', 5, '2027-01-01');