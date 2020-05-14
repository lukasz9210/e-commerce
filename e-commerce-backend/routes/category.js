const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require('../controllers/auth.js')
const {userById} = require('../controllers/user.js')
const {create, categoryById, read, update, remove, list} = require('../controllers/category.js')

router.get('/category/:categoryId', requireSignIn, read)
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create)
router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, update)
router.delete('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, remove)
router.get('/categories', list) //jakby nie działało to trzeba dodać requireSignIn

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router

