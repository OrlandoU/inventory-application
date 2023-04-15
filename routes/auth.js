const express = require('express')
const passport = require('passport')
const authController = require('../controllers/authController')
const router = express.Router()
const {body, validationResult} = require('express-validator')

router.get('/sign-up', authController.signup_get)

router.post('/sign-up', authController.signup_post)

router.get('/login', authController.login_get)

router.post('/login', passport.authenticate('local'), [
    (req, res) => {
        if (!req.user) {
            res.render('login', {
                title: 'Login',
                user,
                errors: [{msg: 'User not found'}]
            })
        }
        res.redirect('/')
    }
]
)

router.get('/logout', authController.logout)


module.exports = router