const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth.js')
const {userById} = require('../controllers/user.js')
const {create, testmd, productById, read, remove, update, list, listReleted, listCategories, listSearch, listBySearch, photo} = require('../controllers/product.js')

router.param('userId', userById)
router.param('productId', productById)



router.get('/product/:pid', testmd) //jak nie ma requireSignIn to nie zdąa przynieść danych do req.product
router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create)
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update)
router.get('/products/releted/:productId', requireSignIn, listReleted)
router.get('/products', list)
router.get('/products/search', listSearch)
router.get('/products/categories', listCategories)
router.post('/products/by/search', listBySearch)
router.get('/product/photo/:productId', photo)





module.exports = router

