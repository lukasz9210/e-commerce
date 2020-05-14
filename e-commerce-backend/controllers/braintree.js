const User = require('../models/user.js')
const braintree = require('braintree')
require('dotenv').config()

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
})

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    })
}


exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    console.log('nonceFromTheClient', nonceFromTheClient)
    let amountFromTheClient = 20
    let newTransaction = gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (error, result) => {
        if(error) {
            console.log(error)
            res.status(500).json(error)
        } else {
            res.json(result)
        }
    })
}