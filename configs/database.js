// const uuid = require("uuid");
const mysql = require('mysql2/promise');
require('dotenv').config();

async function query(sql, params){
    const connection = await mysql.createConnection({
        host: 'devenv2022.cd2norchyjvi.ap-southeast-1.rds.amazonaws.com',
        user: 'itdevteam',
        password: 'itdevteam2022',
        database: 'support',
    });
    const result = await connection.execute(sql, params);
    connection.end();
    return result;
}
module.exports= {query}