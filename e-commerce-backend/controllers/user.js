const {Order} = require('../models/order.js')
const User = require('../models/user.js');


exports.userById = (req, res, next, id) => {
    console.log('userById')
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                err: "User not found"
            });
        }
        req.profile = user
        next()
    })
}

exports.read = (req, res) => {
    req.profile.salt = undefined
    req.profile.hashed_password = undefined
    return res.json(req.profile)
}


exports.update = (req, res) => {
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user) => {
        if(err) {
            return res.status(400).json({err});
        }
        user.salt = undefined
        user.hashed_password = undefined
        return res.json(user)
    })
}


exports.addToUserHistory = (req, res, next) => {
    let history = []
    console.log('req body', req.body)
    req.body.order.products.forEach(item => {
        console.log('item', item)
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    })

    User.findOneAndUpdate({_id: req.profile._id}, {$push: {history:history}}, {new: true}, (error, data) => {
        if(error) {
            return res.status(400).json({
                error: "Could not update user's history"
            })
        }
        next()
    })
}

exports.purchaseHistory = (req, res) => {
    Order.find({user: req.profile._id})
    .populate('user', '_id name')
    .sort('-created')
    .exec((error, orders) => {
        if(error) {
            return res.status(400).json({
                error
            })
        }
        res.json(orders)
    })
}