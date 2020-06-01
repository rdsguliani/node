// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_db',
//     password: 'password'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize ('node_db', 'root', 'password', { 
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
)

module.exports = sequelize;