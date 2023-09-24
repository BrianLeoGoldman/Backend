const express = require('express')
const passport = require('passport')

const router = express.Router()

// Router middleware
router.use((req, res, next) => {
    const date = new Date().toLocaleString()
    console.log('Passport router activated: ', date)
    next()
})

// Endpoints

// Register route using Passport
router.post('/api/register', passport.authenticate(
    'register', // Name of the strategy to use defined in passport.config.js
    { failureRedirect: '/failRegister' }), // Options
    async (req, res) => {
        req.session.user = req.body.nickname
        req.session.role = 'user'
        res.redirect("/realtimeproducts")
        // res.send({ status: 'Success', message: 'User registered' })
    })

router.get('/failRegister', async (req, res) => {
    console.log('Failed registration')
    res.render('failure.hbs', { message: "Something went wrong with your registration" })
})


// Login route using Passport
router.post('/api/login', passport.authenticate(
    'login',
    { failureRedirect: '/failLogin' }),
    async (req, res) => {
        if(!req.user){
            return res.status(400).send({status: 'error', error: 'Invalid credentials'})
        }
        req.session.user = {
            nickname: req.user.nickname,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            email: req.user.email
        }
        req.session.user = req.user.nickname
        req.session.role = 'user'
        res.redirect("/realtimeproducts")
        //res.send({status: 'success', payload: req.user})
    }
)

router.get('/failLogin', (req, res) => {
    console.log('Failed login')
    res.render('failure.hbs', { message: "Something went wrong with your login" })
})

module.exports = router