const Product = require('../models/products');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProducts = (req, res, next) => {
    const product = new Product (req.body.title,
                                 req.body.imgUrl, 
                                 req.body.price,
                                 req.body.description);
    console.log(req.body)
    product.save();
    // products.push({ title: req.body.title });
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('admin/products', {
            pageTitle: 'Products',
            path: '/admin/products',
            prods: products
        });
    });
};
