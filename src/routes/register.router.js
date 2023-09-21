const express = require('express')

const router = express.Router()

// Router middleware
router.use((req, res, next) => {
    const date = new Date().toLocaleString()
    console.log('Register router activated: ', date)
    next()
})

// Endpoints

router.get('/api/register', (req, res) => {
    const { username, firstname, lastname, password, email } = req.query
    if (!username || !password || !email) {
        return res.send('Registration fialed. Missing fields')
    }
    req.session.user = username
    req.session.admin = true
    console.log(req.session)
    res.send('Login successfull!')
})