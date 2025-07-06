
const pool = require('../database/db');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const createuser = async (email, username, program, password) => {
    const result  =await pool.query
    ('Insert into users ( email,username,program,password) values($1,$2,$3,$4)returning *',
        [email,username,program,password]
    );
    console.log("Created User:", result.rows[0]);
    return result.rows[0];
};
const getuserbyemail= async(email)=>{
    const result =await pool.query("select * from users where email =$1",
        [email]     
    );
return result.rows[0];
};

module.exports ={createuser,getuserbyemail};
