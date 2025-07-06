require('dotenv').config({path: '../env'});

const {Pool} = require('pg');


const pool = new Pool({
    host : process.env.DB_HOST ,
    user : process.env.DB_USER,
    password : String(process.env.DB_PASSWORD),
    database : process.env.DB_NAME,
    port : process.env.DB_PORT,
    max:100, 
});

module.exports = pool;