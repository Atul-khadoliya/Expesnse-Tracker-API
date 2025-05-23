const {logIn,signUp} = require('../controllers/user')
const express = require('express')
const router = express.Router() ;


router.post('/login',logIn)
router.post('/signup',signUp)

module.exports = router