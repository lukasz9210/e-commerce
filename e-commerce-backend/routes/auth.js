const express = require('express');
const router = express.Router();
const {userSingupValidator} = require('../validation/index.js');

const {signUp, signIn, signOut, requireSignIn} = require('../controllers/auth.js')

router.post('/signup', userSingupValidator, signUp)
router.post('/signin', signIn)
router.get('/signout', signOut)
router.get('/hello', requireSignIn)

module.exports = router