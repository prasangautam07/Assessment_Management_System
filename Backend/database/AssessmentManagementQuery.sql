CREATE TABLE users(
  id serial PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  program VARCHAR(50) NOT NULL
);

select * from users