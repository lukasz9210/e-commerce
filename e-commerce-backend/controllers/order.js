const {Order, CartItem} = require('../models/order.js')
const {errorHandler} = require('../helpers/dbErrorHandler.js')

exports.create = (req, res) => {
    console.log('order create', req.body)
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.listOrders = (req, res) => {
    Order.find()
    .populate('user', '_id name address')
    .sort('-created')
    .exec((error, orders) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(orders)
    })
}

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
}

exports.orderById = (req,res,next,id) => {
    Order.findById(id)
    .populate('prducts.product', 'name price')
    .exec((error, order) => {
        if(error || !order) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        req.order = order
        next()
    })
}


exports.updateStatus = (req, res) => {
    Order.update({_id: req.body.orderId}, {$set: {status: req.body.status}}, (error, order) => {
        if(error || !order) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(order)
    })
}