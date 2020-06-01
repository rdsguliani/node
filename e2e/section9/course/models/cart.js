const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb({products: [], totalPrice: 0});
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Cart {

  static addProduct(id, productPrice, cb) {
    getProductsFromFile ( eCart => {
     
      let cart = {products: eCart.products, totalPrice: eCart.totalPrice};
      let updatedProduct;
  
         const existingProductIndex = cart.products.findIndex( p => p.id === id);
         console.log(existingProductIndex)
         const existingProduct  = cart.products[existingProductIndex];
         console.log(existingProduct);
         if(existingProduct) {
           updatedProduct = { ... existingProduct};
           updatedProduct.qty++;
           cart.products = [...cart.products];
           cart.products[existingProductIndex] = updatedProduct;
         } else {
            updatedProduct = { id: id, qty: 1};
            cart.products = [ ...cart.products, updatedProduct];
         }
          cart.totalPrice = cart.totalPrice + +productPrice;
          fs.writeFile(p, JSON.stringify(cart), (err) => {
             console.log('error ' +  err);
             cb();
        })
      })
   }

   static getCart (cb) {
    getProductsFromFile ( eCart => {
      cb(eCart);
    });
   }

};
