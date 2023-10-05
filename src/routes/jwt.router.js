const express = require('express')
const { generateToken, authToken } = require('../../Utils/jwt-utils.js')
const passport = require('passport')
const { passportCall, authorization } = require('../../Utils/errors-utils.js')

const router = express.Router()

const users = []

// Endpoints

router.post('/jwt/register', (req, res) => {
    const {name, email, password} = req.body
    const exists = users.find(user => user.email === email)
    if(exists) {
        return res.status(400).send({status: 'error', error: 'User already exists'})
    }
    const user = {
        name, 
        email,
        password
    }
    users.push(user)
    const accessToken = generateToken(user)
    // Token is sent without a cookie:
    // res.send({ status: 'success', access_Token })
    // Token is sent with a cookie:
    res.cookie('jwtCookie', accessToken, {maxAge:60*60*100, httpOnly:true}).send({message: 'Registered ok'})

})

router.post('/jwt/login', (req, res) => {
    const {email, password} = req.body
    const user = users.find(user => user.email === email && user.password === password)
    if(!user) {
        return res.status(400).send({status: 'error', error: 'Invalid credentials'})
    }
    const accessToken = generateToken(user)
    // Token is sent without a cookie:
    // res.send({status: 'success', accessToken})
    // Token is sent with a cookie;
    res.cookie('jwtCookie', accessToken, { maxAge: 60 * 60 * 100, httpOnly: true }).send({ message: 'Login ok' })
})

router.get('/jwt/current', authToken, (req, res) => {
    // We are using authToken, so we know there is an user object in our request (otherwise middleware would give error)
    res.send({status: 'success', payload: req.user})
})

// We use session: false because we don't use express-session
router.get('/jwt-passport/current', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.send(req.user)
})

// We use the passportCall function to set the passport strategy on runtime and manage error messages
router.get(
    '/jwt-passport/current-error', 
    passportCall('jwt'), // First middleware
    authorization('user'), // Second middleware
    (req, res) => {
        res.send(req.user)
    }
)

module.exports = router