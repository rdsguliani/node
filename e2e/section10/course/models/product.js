const db = require('../util/database')

const Cart = require('./cart');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if(this.id) {
      console.log(this.id, this.title, this.description, this.price)
      // var str = 'UPDATE products SET description = "'+ this.title + '"  WHERE id="1"'
      // console.log(str);
      return db.execute('UPDATE products SET title = ? WHERE id="1"', [this.title]);
    } else {
      return db.execute(`INSERT INTO products (name, title, description, imageUrl, price) VALUES (?, ? ,? ,? ,?)`,
                        [this.title, this.title, this.description, this.imageUrl, this.price ]
                        );
    }
    // getProductsFromFile(products => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       prod => prod.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });
  }

  static deleteById(id) {
    return db.execute('DELETE from products where id = '+ id.toString());
    // getProductsFromFile(products => {
    //   const product = products.find(prod => prod.id === id);
    //   const updatedProducts = products.filter(prod => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //     if (!err) {
    //       Cart.deleteProduct(id, product.price);
    //     }
    //   });
    // });
  }

  static fetchAll() {
    return db.execute('SElECT * from products');
    // .then ( (result) => {
    //     console.log(result)
    // }). catch ( (err) => {
    //     console.log(err)
    // })
  }

  static findById(id) {
    return db.execute('SELECT * from products WHERE id="'+ id + '"');
    // getProductsFromFile(products => {
    //   const product = products.find(p => p.id === id);
    //   cb(product);
    // });
  }
};
