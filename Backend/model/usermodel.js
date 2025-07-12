import { connectToDatabase } from '../database/db.js';

export const createUser = async (email, username, program, password, role = 'student') => {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error('Database connection failed');
  }

  const result = await db.query(
    'INSERT INTO users (email, username, program, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [email, username, program, password, role]
  );

  return result.rows[0];
};
export const getUserByUsername= async(username)=>{
    const db= await connectToDatabase();
    if (!db) {
        throw new Error("Database connection failed");
    }
    const result =await db.query("select * from users where username =$1",
        [username]     
    );
return result.rows[0];
};
export const getUserByEmail= async(email)=>{
    const db= await connectToDatabase();
    if (!db) {
        throw new Error("Database connection failed");
    }
    const result =await db.query("select * from users where email =$1",
        [email]     
    );
return result.rows[0];
};
