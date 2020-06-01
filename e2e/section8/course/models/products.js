const fs = require('fs');
const path = require('path');
// const products = [];

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const fetchProductsFromFile = cb => {
    fs.readFile( p , (err, data) => {
        if(err) {
            return cb([]);
        }
        return cb(JSON.parse(data));
    });
}

module.exports = class Product {
    constructor(title, imgUrl, price, description) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
    }

    save () {
        fetchProductsFromFile ( products => {
            products.push(this);
            fs.writeFile(p , JSON.stringify(products), (err, data) => {
                console.log('added product');
            })
        });
    }

    static fetchAll (cb) {
        fetchProductsFromFile (cb);
    }
}