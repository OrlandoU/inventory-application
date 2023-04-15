const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator')

exports.signup_get = async (req, res, next) => {
    res.render('signup', {title: 'Sign Up'})
}

exports.signup_post = [
    body('username', 'Invalid Password')
    .trim()
    .isLength({min: 1, max:30})
    .withMessage('Username must be at least 8 chars long')
    .isAlphanumeric()
    .withMessage('Username contains non-alphanumeric chars')
    .custom(async(value)=>{
        const queried = await User.findOne({username: value})
        if(queried){
            throw new Error('Username not available');
        }
        return true
    })
    .escape(),
    body('password', 'Password must be at least 8 chars long')
    .trim()
    .isLength({min: 8, max: 30})
    .escape(),
    body('password_confirmation')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
    ,async (req, res, next) => {
        try {
            const errors = validationResult(req)
            const password = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                username: req.body.username,
                password
            })

            if (!errors.isEmpty()) {
                res.render('signup', {
                    title: 'Sign Up',
                    user,
                    errors: errors.array()
                })
            } else {
                await user.save()
                res.redirect('/')
            }   
        } catch (error) {
            return next(error)
        }
    }
]

exports.login_get = (req, res, next) => {
    res.render('login', {title: 'Login'})
}

exports.logout = (req, res, next) => {
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        res.redirect('/')
    })
}

