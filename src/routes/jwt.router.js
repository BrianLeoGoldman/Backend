const express = require('express')
const { generateToken, authToken } = require('../../Utils/utils.js')

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
    const access_Token = generateToken(user)
    // Token is sent without a cookie:
    // res.send({ status: 'success', access_Token })
    // Token is sent with a cookie:
    res.cookie('jwtCookie', access_Token, {maxAge:60*60*100, httpOnly:true}).send({message: 'Registered ok'})

})

router.post('/jwt/login', (req, res) => {
    const {email, password} = req.body
    const user = users.find(user => user.email === email && user.password === password)
    if(!user) {
        return res.status(400).send({status: 'error', error: 'Invalid credentisl'})
    }
    const accessToken = generateToken(user)
    // Token is sent without a cookie:
    // res.send({status: 'success', accessToken})
    // Token is sent with a cookie;
    res.cookie('jwtCookie', access_Token, { maxAge: 60 * 60 * 100, httpOnly: true }).send({ message: 'Login ok' })
})

router.get('/current', authToken, (req, res) => {
    // We are using authToken, so we know there is an user object in our request (otherwise middleware would give error)
    res.send({status: 'success', payload: req.user})
})

module.exports = router