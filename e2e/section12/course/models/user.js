

const getDb = require('../util/database').getDb;
var ObjectId = require('mongodb').ObjectID;

class User {
  constructor (id, name, email, cart) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cart = cart;
  }

  save () {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart (product) {
      
    const cartProductIndex = this.cart.items.findIndex( cp => {
        console.log(cp.productId.toString(),  product._id.toString())
        return cp.productId.toString() === product._id.toString()
    });
   

    let newQuantity = 1;
    const updatedCartItems = [ ...this.cart.items ];

    if(cartProductIndex > 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
        updatedCartItems.push( {
            productId: ObjectId(product._id),
            quantity: newQuantity
        })
    }

    const updatedCart = {items: updatedCartItems}
    const db = getDb();
    return db.collection('users').updateOne(
        { _id: ObjectId( this.id) },
        { $set: {cart: updatedCart}}
    );
  }

  static getUserById(id) {
    const db = getDb();
    // console.log( ' id :: ' + id);
    return db.collection('users').findOne( { _id: ObjectId(id)})
    // .then ( (result) => {
    //   console.log(result);
    // }).catch ( (err) => {
    //   console.log(err)
    // }) 
  }

getCart () {
    const db = getDb();
    const productIds = this.cart.items.map( product => {
        return product.productId;
    })

    return db.collection('products').find({ _id : { $in: productIds}}).toArray()
    .then( products => {
        return products.map( p => {
            return {
                ...p,
                quantity: this.cart.items.find( i => {
                    return i.productId.toString() === p._id.toString()
                }).quantity
            }
        })
    })
  }

  deleteFromCart (id) {
    const db = getDb();
    const updatedCartItems = this.cart.items.filter( product => {
        return product.productId.toString() !== id.toString();
    })

    

    const updatedCart = {items: updatedCartItems}

    return db.collection('users').updateOne(
        { _id: ObjectId( this.id) },
        { $set: {cart: updatedCart}}
    )
  }

  addOrder () {
    const db = getDb();

    return db.collection('orders').insertOne(this.cart)
    .then ( result => {
        this.cart = {items: []}
        return db.collection('users').updateOne(
            { _id: ObjectId( this.id) },
            { $set: {cart: { items: [] }}}
        )
    })
  }

}


module.exports = User;

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database') 

// const User = sequelize.define( 'user', {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     }
// });

// module.exports = User;