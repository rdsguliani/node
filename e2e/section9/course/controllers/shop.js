const Product = require('../models/product');
const Cart = require('../models/cart');

function productList (res, products) {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
}

exports.getProducts = (req, res, next) => {
  // productList(res);
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  console.log('IN product detail ::')
  const productId = req.params.productId;
  Product.fetchProductById ( productId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product Details',
      path: '/products'
    });
  })
};

exports.postAddToCart = (req, res, next) => {
//   console.log('IN add to cart  ::')
//   console.log(req);
  const productId = req.body.productId;
//   console.log(productId);
  Product.fetchProductById ( productId, (product) => {
    Cart.addProduct (product.id, product.price, () => {
      res.redirect('/cart')
    })
//    console.log(product)
//    Product.saveToCart(product, () => {
//       res.redirect('/products')
//     });
//       // Product.saveToCart(product);
//     // res.render('shop/product-list', {
//     //   product: product,
//     //   pageTitle: 'Product List',
//     //   path: '/products'
//     // });
  })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {

  Cart.getCart( (cartItems) => {
console.log(cartItems);
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      items: cartItems.products,
      price: cartItems.totalPrice
    });
  })


};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
