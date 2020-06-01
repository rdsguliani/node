// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_db',
//     password: 'password'
// });

// module.exports = pool.promise();

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize ('node_db', 'root', 'password', { 
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306
//     }
// )

// module.exports = sequelize;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://raman:rds123@cluster0-ecdsk.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    .then ( client => {
        console.log('connected')
        db = client.db();
        callback();
    }). catch (err => {
        console.log(err);
        console.log('error while connecting')
        throw err;
    })
}


const getDb = function()  {
    if (db) {
        return db;
    }

    throw 'No db found !!';
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
