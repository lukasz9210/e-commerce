const Category = require('../models/category.js')
const {errorHandler} = require('../helpers/dbErrorHandler.js');

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        return res.json(data)
    })

}


exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category) {
            return status(400).json({
                err: "Category not found"
            })
        }
        req.category = category
    })
    next()
}


exports.read = (req, res, next) => {
    return res.json(req.category)
}


exports.update = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, category) => {
        if(err) {
            return res.status(400).json({err})
        }
        return res.json(category)
    })
}

exports.remove = (req, res) => {
    let category = req.category
    category.remove((err, deletedCategory) => {
        if(err) {
            return res.status(400).json({err})
        }
        return res.json({
            deletedCategory,
            "message": "Category deleted!"
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err) {
            return res.status(400).json({err})
        }
        return res.json(categories)
    })
}