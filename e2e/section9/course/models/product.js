const fs = require('fs');
const path = require('path');
const userCart = [];

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(product, cb) {
    getProductsFromFile(products => {
      const index = products.findIndex ( p => p.id ===  product.productId);
      products.splice(index, 1);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
        cb(products);
      });
    });
  }

  static updateProduct (product, cb) {
    getProductsFromFile(products => {
      const index = products.findIndex ( p => p.id ===  product.productId);
      const selectedProduct = products[index];
        selectedProduct.title = product.title;
        selectedProduct.imageUrl = product.imageUrl;
        selectedProduct.price = product.price;
        selectedProduct.description = product.description;
        products[index] = selectedProduct;
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
          cb(products);
        });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  
  static fetchProductById (id, cb) {
    getProductsFromFile( products => {
      const prod =  products.find(p => p.id === id)
      cb(prod);
    })
  }

  // static saveToCart (product, cb) { 
  //   getProductsFromFile(products => {
  //     products.filter (p => {
  //       if(p.id === product.id) {
  //         p.inCart = true;
  //         userCart.push(p);
  //         // break;
  //       }
  //     });
  //     fs.writeFile(p, JSON.stringify(products), err => {
  //       console.log(err);
  //       cb();
  //     });
  //   });
   
  // }
};
