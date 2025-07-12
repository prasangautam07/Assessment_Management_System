

import  {connectToDatabase } from '../database/db.js';
import bcrypt from 'bcrypt';

export const createUser = async (email, username, program, password) => {
    const db= await connectToDatabase();
    if (!db) {
        throw new Error("Database connection failed");
    }
    const result  =await db.query
    ('Insert into users ( email,username,program,password) values($1,$2,$3,$4)returning *',
        [email,username,program,password]
    );
    console.log("Created User:", result.rows[0]);
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

