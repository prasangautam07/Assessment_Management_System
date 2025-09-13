CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(200) UNIQUE NOT NULL,
      username VARCHAR(200) NOT NULL,
      program VARCHAR(100) NOT NULL,
      password VARCHAR(200) NOT NULL,
      role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'admin'))
    );

CREATE TABLE IF NOT EXISTS studentData(
    roll VARCHAR(200) UNIQUE PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    contact_no VARCHAR(100),
    gender VARCHAR(10),
    dob date,
    category VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS teacherData(
    username VARCHAR(200) UNIQUE PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    gender VARCHAR(10),
    dob date
);

create table IF NOT EXISTS userimage(
  imageurl text,
  user_id int references users(id)
);

CREATE TABLE IF NOT EXISTS subjects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200),
      program VARCHAR(100),
      semester INT
    );

CREATE TABLE IF NOT EXISTS student_marks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
  semester INTEGER,
  marks VARCHAR(50),
  UNIQUE(user_id, subject_id) 
);

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);