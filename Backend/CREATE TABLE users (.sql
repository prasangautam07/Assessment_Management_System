CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

INSERT INTO users (name, email, password) VALUES
('John Doe', 'd@gmail.com', 'password123');