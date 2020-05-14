const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth.js')
const {userById, addToUserHistory} = require('../controllers/user.js')
const { create, listOrders, getStatusValues, orderById, updateStatus } = require('../controllers/order.js')
const { decreaseQuantity } = require('../controllers/product.js')

router.get('/order/list/:userId', requireSignIn, isAuth, isAdmin, listOrders)
router.get('/order/status-values/:userId', requireSignIn, isAuth, isAdmin, getStatusValues)
router.post('/order/create/:userId', requireSignIn, addToUserHistory, decreaseQuantity, create)
router.put('/order/:orderId/status/:userId', requireSignIn, isAuth, isAdmin, updateStatus)

router.param('userId', userById)
router.param('orderId', orderById)


module.exports = router

