const express = require('express');
const router = express.Router();
//const {userSingupValidator} = require('../validation/index.js');
const {userById} = require('../controllers/user.js')
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth.js')
const {read, update, purchaseHistory} = require('../controllers/user.js')

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    return res.json({
        user: req.profile
    })
})
router.get('/user/:userId', requireSignIn, isAuth, read)
router.get('/orders/by/user/:userId', requireSignIn, isAuth, purchaseHistory)
router.put('/user/:userId', requireSignIn, isAuth, update)
router.param('userId', userById)

module.exports = router