const express = require('express')
const passport = require('passport')
const authController = require('../controllers/authController')
const router = express.Router()

router.get('/sign-up', authController.signup_get)

router.post('/sign-up', authController.signup_post)

router.get('/login', authController.login_get)

router.post('/login', passport.authenticate('local'), (req, res)=>{
    res.redirect('/')
})

router.get('/logout', authController.logout)


module.exports = router