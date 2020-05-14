const Product = require('../models/product.js')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')


exports.productById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id).populate('category')
    req.product = product
    } catch(err) {
        res.status(400).json(err)
    }
    next()
}





exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                err: "Image could not be uploaded"
            })
        }
        let product = new Product(fields)

        const {name, description, price, category, quantity, shipping} = fields
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                err: "All fields are required"
            })
        }

        if(files.photo) {
            if(files.photo > 1000000) {
                return res.status(400).json({
                    err: "File can be max 1mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, data) => {
            if(err) {
                return res.json({
                    err: err
                })
            }
            return res.json({data})
        })
    })
}



exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                err: "Image could not be uploaded"
            })
        }
        let product = req.product
        product = _.extend(product, fields)

        const {name, description, price, category, quantity, shipping} = fields
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                err: "All fields are required"
            })
        }

        if(files.photo) {
            if(files.photo > 1000000) {
                return res.status(400).json({
                    err: "File can be max 1mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, data) => {
            if(err) {
                return res.json({
                    err: "Error"
                })
            }
            return res.status(400).json({data})
        })
    })
}





exports.read = async (req, res) => {
    Product.findById(req.params.productId).exec((err, product) => {
        console.log("HERE!!!")
        if(err || !product) {
            return res.status(400).json({
                err: "Product not found"
            })
        }
        console.log("PRODUCTO", product)
        req.product = product
    }).then(() => {
        return res.json(req.product)
    }).catch(err => {
        console.log(err)
    })
    
    
}


exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({err})
        }
        return res.json({
            deletedProduct,
            "message": "Product deleted!"
        })
    })
}


exports.list = (req, res) => {
    console.log('req.query', req.query)
    let order = req.query.order ? req.query.order : "asc"
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find().select("-photo").populate("category").sort([[sortBy, order]]).limit(limit).exec((err, data) => {
        if(err) {
            return res.status(400).json({err})
        }
        res.json(data)
    })
}








exports.listReleted = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 3
    Product.find({_id:{$ne: req.product}, category: req.product.category}).limit(limit).populate("category", "_id name")
    .exec((err, data) => {
        if(err) {
            return res.status(400).json({err})
        }
        return res.json({data})
    })
}


exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if(err) {
            return res.status(400).json({err})
        }
        return res.json(categories)
    })
}






/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 

 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


exports.photo = (req, res, next) => {
    console.log('req.product', req.product)
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}


exports.listSearch = (req, res) => {
    const query = {}
    if (req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'}
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category
        }
    }
    Product.find(query, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json(products)
    }).select("-photo")
}



exports.testmd = (req, res) => {
  
    Product.findById(req.params.pid).then(product => {
        req.product = product
        return res.json(product)
    })
}

exports.decreaseQuantity = (req, res, next) => {
    let bulkOpt = req.body.order.products.map(p => {
        return {
            updateOne: {
                filter: {_id: p._id},
                update: {$inc: {quantity: -p.count, sold: +p.count}}
            }
        }
    })
    console.log('uuuuuuuuuuuuuuuuuuuuuuu')
    Product.bulkWrite(bulkOpt, {}, (error, products) => {
        if(error) {
            return res.status(400).json({
                error: "Could not update quantity"
            })
        }
        next()
    })
}