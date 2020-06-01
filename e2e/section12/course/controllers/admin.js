const Product = require('../models/product');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const user = req.user
  const product = new Product(null, title, description, imageUrl, price, user._id)

  product.save()
  .then( () => {
      res.redirect('/');
    }).catch ((err) => {
      console.log(err);
    });

//  console.log(req.user)
//   req.user.createProduct({
//     title: title, 
//     name: title, 
//     imageUrl: imageUrl,
//     price: price,
//     description: description
//   }).then( () => {
//     res.redirect('/');
//   }).catch ((err) => {
//     console.log(err);
//   });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // Product.findByPk(prodId).then( (product) => {
  Product.getProductById (prodId).then( (product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch( (err) => {
    console.log(err);
  });
};

exports.postEditProduct = (req, res, next) => {
  // console.log(req);
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );

  updatedProduct.save()
   .then( () => {
      res.redirect('/');
    }).catch ((err) => {
      console.log(err);
    });

  // Product.update({
  //   title: updatedTitle, 
  //   name: updatedTitle, 
  //   imageUrl: updatedImageUrl,
  //   price: updatedPrice,
  //   description: updatedDesc
  // }, {
  //   where: {
  //     id: prodId
  //   }
  // }).then( () => {
  //   res.redirect('/admin/products');
  // })
  // .catch( err => console.log(err))

};

exports.getProducts = (req, res, next) => {
  Product.getAllProducts().then( (products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  }).catch ((err) => {
    console.log(err);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log(req);
  // console.log(prodId);
  Product.delete(prodId).then ( () => {
    res.redirect('/admin/products');
  }).catch(err => console.log(err))

};
