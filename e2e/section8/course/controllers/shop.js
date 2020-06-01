const Product = require('../models/products');

// exports.getAddProducts = (req, res, next) => {
//     res.render('admin/add-product', {
//         pageTitle: 'Add Product',
//         path: '/admin/add-product',
//         formsCSS: true,
//         productCSS: true,
//         activeAddProduct: true
//     });
// };

// exports.postAddProducts = (req, res, next) => {
//     const product = new Product (req.body.title);
//     product.save();
//     // products.push({ title: req.body.title });
//     res.redirect('/');
// };

exports.getIndex = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Index',
            path: '/'
        });
    }); 
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Product List',
            path: '/products'
        });
    }); 
}


exports.getCart = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('shop/cart', {
            prods: products,
            pageTitle: 'your cart',
            path: '/cart'
        });
    }); 
}

exports.getOrders = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('shop/order', {
            prods: products,
            pageTitle: 'orders',
            path: '/orders'
        });
    }); 
}

exports.getCheckout= (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('shop/checkout', {
            prods: products,
            pageTitle: 'checkout',
            path: '/checkout'
        });
    }); 
}


exports.notFound = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path:'' });
}