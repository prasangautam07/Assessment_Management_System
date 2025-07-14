import asyncHandler from 'express-async-handler';
import { connectToDatabase } from '../database/db.js';

export const createTeacher = asyncHandler(async (email, username, subject, assignedclass, hashedpassword) => {
  const db = await connectToDatabase();
  if (!db) throw new Error("Database connection failed");

  // Check if user with email already exists
  const existingUserResult = await db.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  let userId;

  if (existingUserResult.rows.length > 0) {
    
    userId = existingUserResult.rows[0].id;
  } else {
  
    const userResult = await db.query(
      "INSERT INTO users(email, username, password, role) VALUES ($1, $2, $3, $4) RETURNING id",
      [email, username, hashedpassword, 'teacher']
    );
    userId = userResult.rows[0].id;
  }

  if (!assignedclass) {
    throw new Error("assigned_class is required");
  }

   const existingTeacher = await db.query(
    "SELECT * FROM teachers WHERE user_id = $1",
    [userId]
  );

  if (existingTeacher.rows.length > 0) {
    throw new Error("Teacher record already exists for this user");
  }
  await db.query(
    "INSERT INTO teachers(user_id, subject, assigned_class) VALUES ($1, $2, $3)",
    [userId, subject, assignedclass]
  );

  return userId;
});


export const getallteachers = asyncHandler(async () => {
  const db = await connectToDatabase();
  if (!db) throw new Error("Database connection failed");

  const result = await db.query(
    `SELECT users.id, users.email, users.username, teachers.subject, teachers.assigned_class
     FROM users
     JOIN teachers ON users.id = teachers.user_id
     WHERE users.role = 'teacher'`
  );

  return result.rows;
});

export const updateTeacher= asyncHandler(async(userId,subject,assignedclass)=>{
  const db = await connectToDatabase();
  if (!db)
   throw new Error("Database connection Failed");

  const existingTeacher = await db.query(
    "select * from teachers where user_id= $1",[userId] 
  );

  if (existingTeacher.rows.length==0){
    throw new Error("teacher not found with that userid");  
  }

  const result = await db.query(
    "update teachers set subject =$1 , assigned_class=$2 where user_id= $3 returning *",[subject,assignedclass,userId]
  );

  return result.rows[0];

});

export const deleteTeacherbyid= asyncHandler(async(userId)=>{
        const db = await connectToDatabase;
        if (!db)
          throw new Error("Database not connected");

    const existingTeacher =await db.query(
      "select * from teachers where user_id = $1",[userId]

    );

    if (existingTeacher.rows.length==0){
      throw new Error("Teacher not found with that userid")
    }

    await db.query ("delete from teachers where user_id =$1",[userId
      
    ])
        
});

