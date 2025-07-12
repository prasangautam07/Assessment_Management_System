import { connectToDatabase } from '../database/db.js';
import asyncHandler from 'express-async-handler';

export const createAdmin = asyncHandler(async (email, username, hashedPassword) => {
  const db = await connectToDatabase();

  const result = await db.query(
    "INSERT INTO users (email, username, password, role) VALUES ($1, $2, $3, $4) RETURNING id",
    [email, username, hashedPassword, 'admin']
  );

  return result.rows[0].id;
});
