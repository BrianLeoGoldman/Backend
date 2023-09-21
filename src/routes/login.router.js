const express = require('express')
const Storage = require('../dao/storageUserMongo.js')

const storage = new Storage()

const router = express.Router()

// Router middleware
router.use((req, res, next) => {
    const date = new Date().toLocaleString()
    console.log('Login router activated: ', date)
    next()
})

function auth(req, res, next) {
    if(req.session?.user === 'admin' && req.session?.admin) {
        next()
    }
    return res.status(401).send('Authorization error!')
}

// Endpoints

const cookieName = "My first cookie"
const signedCookieName = 'Signed cookie'

router.get('/api/setCookie', (req, res) => {
    res.cookie(cookieName, "This is the value of the cookie", {maxAge: 10000}).send("This is just the message of the response")
})

router.get('/api/setSignedCookie', (req, res) => {
    res.cookie(signedCookieName, "This is the value of the signed cookie", { maxAge: 10000, signed: true }).send("This is just the message of the response of the signed cookie")
})

router.get('/api/getCookie', (req, res) => {
    let cookies = req.cookies
    console.log(cookies)
    res.send(cookies)
})

router.get('/api/getSignedCookie', (req, res) => {
    let cookies = req.signedCookies
    console.log(cookies)
    res.send(cookies)
})

router.get('/api/deleteCookie', (req, res) => {
    res.clearCookie(cookieName).send('Cookie successfully deleted')
})

router.get('/api/session', (req, res) => {
    if(req.session.counter) {
        req.session.counter++
        res.send(`Site has been visited ${req.session.counter} times`)
    }
    else {
        req.session.counter = 1
        res.send('Welcome!')
    }
})

router.post('/api/login', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.send('Information missing')
    }
    if (username == 'admin' && password == 'admin1234') {
        req.session.user = username
        req.session.admin = true
        res.send('Admin login successfull!')
    }
    storage.getLoginInfo(username, password)
        .then((response) => {
            console.log("########################")
            console.log(response)
            req.session.user = username
            req.session.admin = false
            console.log(req.session)
            res.send('User login successfull!')
        })
        .catch((error) => {
            res.send(`Error: ${error}`)
        })
})

router.get('/api/private', auth, (req, res) => {
    res.send('If you are seeing this is because you are authorized!')
})

router.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout error', body: err })
        }
        else {
            res.send('logout successful!')
        }
    })
})

module.exports = router