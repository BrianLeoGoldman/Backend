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

router.post('/api/register', (req, res) => {
    const { username, firstname, lastname, password, email } = req.body
    if (!username || !firstname || !lastname || !password || !email) {
        return res.send('Information missing')
    }
    if (username == 'adminCoder') {
        res.send('You cannot use that username')
    }
    storage.notExists(username)
        .then((response) => {
            if(response) {
                let user = {
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    email: email
                }
                storage.save(user)
                    .then((response) => {
                        req.session.user = username
                        req.session.role = user
                        res.redirect("/realtimeproducts")
                    })
                    .catch((error) => {
                        res.send(`${error}`)
                    })
            }
            else {
                return res.send(`User ${username} already exists`)
            }
        })
        .catch((error) => {
            return res.send('Error when checking for user')
        })
})

router.post('/api/login', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.send('Information missing')
    }
    if (username == 'adminCoder' && password == 'adminCod3r123') {
        req.session.user = 'adminCoder'
        req.session.role = 'admin'
        console.log("Admin login completed")
        res.redirect("/realtimeproducts")
    }
    storage.notExists(username)
        .then((response) => {
            if(response) {
                return res.send(`User ${username} does not exists`)
            }
            else {
                storage.getLoginInfo(username, password)
                    .then((response) => {
                        req.session.user = username
                        req.session.role = 'user'
                        console.log("User login completed")
                        res.redirect("/realtimeproducts")
                    })
                    .catch((error) => {
                        res.send(`${error}`)
                    })
            }
        })
        .catch((error) => {
            return res.send('Error when checking for user')
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
            res.redirect("/login")
        }
    })
})

module.exports = router