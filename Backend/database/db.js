require('dotenv').config({path: '../env'});

const {Pool} = require('pg');


const pool = new Pool({
    /* host : process.env.DB_HOST ,
    user : process.env.DB_USER,
    password : String(process.env.DB_PASSWORD),
    database : process.env.DB_NAME,
    port : process.env.DB_PORT,
    max:100,  */

    connectionString: 'postgresql://prasan:rrFjT8me1qBE19YUNWYTxBEcd9uHuOhL@dpg-d1l7cc6mcj7s73bsb1k0-a.oregon-postgres.render.com/assessment_management',
        ssl: {
          rejectUnauthorized: false, // required for Render
    },
});

module.exports = pool;