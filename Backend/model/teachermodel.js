import { connectToDatabase } from '../database/db.js';

export const getAllStudents= async () => {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error('Database connection failed');
  }
  const result = await db.query(
      `SELECT users.id, users.username, users.program,users.role,
              studentData.name, studentData.roll, studentData.dob,
               studentData.category
       FROM users
       LEFT JOIN studentData ON users.username = studentData.roll
       WHERE users.role = $1`,
      ['student']
    );
  return result.rows;
};

export const getStudentById = async (id) => {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error('Database connection failed');
  }
  const result = await db.query('SELECT * FROM users WHERE id = $1 AND role = $2', [id, 'student']);
  return result.rows[0];
};

export const addStudentMarks = async (data) => {
  const db = await connectToDatabase();
  if (!db) throw new Error('Database connection failed');

  const { username, program, marks, semester } = data;
  const userResult = await db.query(
    `SELECT id FROM users WHERE username = $1 AND program = $2`,
    [username, program]
  );

  if (userResult.rows.length === 0) {
    throw new Error("User not found");
  }

  const user_id = userResult.rows[0].id;

  const insertQuery = `
    INSERT INTO student_marks (user_id, subject_id, semester, marks)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (user_id, subject_id) DO UPDATE
    SET marks = EXCLUDED.marks, semester = EXCLUDED.semester;
  `;

  for (const subjectName in marks) {
    const markValue = marks[subjectName];

    const subjectResult = await db.query(
      `SELECT id FROM subjects WHERE name = $1 AND program = $2 AND semester = $3`,
      [subjectName, program, semester]
    );

    if (subjectResult.rows.length === 0) {
      console.warn(`Subject not found: ${subjectName}`);
      continue;
    }

    const subject_id = subjectResult.rows[0].id;

    await db.query(insertQuery, [user_id, subject_id, semester, markValue]);
  }

  return true;
};

export const getStudentsMarks = async (username) => {
  const db = await connectToDatabase();
  if (!db) throw new Error('Database connection failed'); 
  const result = await db.query(
    `SELECT 
        subjects.name AS subject, 
        subjects.semester, 
        student_marks.marks
     FROM student_marks
     JOIN subjects ON student_marks.subject_id = subjects.id
     WHERE student_marks.user_id = (
       SELECT id FROM users WHERE username = $1
     )
     ORDER BY subjects.semester, subjects.name`,
      [username]
  );
  return result.rows;
}
