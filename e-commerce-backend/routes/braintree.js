const express = require('express')
const router = express.Router()

const {requireSignIn, isAuth} = require('../controllers/auth.js')
const {userById} = require('../controllers/user.js')
const {generateToken, processPayment} = require('../controllers/braintree.js')


router.get('/braintree/getToken/:userId', requireSignIn, isAuth, generateToken)
router.post('/braintree/payment/:userId', requireSignIn, isAuth, processPayment)

router.param('userId', userById)

module.exports = router