const getDb = require('../util/database').getDb;
var ObjectId = require('mongodb').ObjectID;

class Product {
  constructor (id, title, description, imageUrl, price, userId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.userId = userId;
  }

  save () {
    const db = getDb();
    console.log(this.id)
    if(this.id) {
      var myquery = { _id: ObjectId(this.id)}
      var newvalues = { $set: this };
      console.log(myquery);
      console.log(this);
      return db.collection('products').updateOne(myquery, newvalues);
    } 
    else {
      return db.collection('products').insertOne(this)
      .then ( (result) => {
        console.log(result);
      }).catch ( (err) => {
        console.log(err)
      }) 
    }
  }

  static getAllProducts () {
    const db = getDb();
    // console.log('getig products ');
    // return db.collection('products').find()

    return  db.collection('products').find().toArray();
  }

  static delete ( id ) { 
    const db = getDb();
    return db.collection('products').deleteOne( { _id: ObjectId(id)})
    .then ( (result) => {
      // console.log(result);
    }).catch ( (err) => {
      console.log(err)
    }) 
  }

  static getProductById(id) {
    const db = getDb();
    // console.log( ' id :: ' + id);
    return db.collection('products').findOne( { _id: ObjectId(id)})
    // .then ( (result) => {
    //   console.log(result);
    // }).catch ( (err) => {
    //   console.log(err)
    // }) 
  }

}

module.exports = Product;


// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//   }, 
//   name: Sequelize.STRING,
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   }
// });

// module.exports = Product;

