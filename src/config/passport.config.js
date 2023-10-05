const passport = require('passport')
const local = require('passport-local')
const GitHubStrategy = require('passport-github2')
const jwt = require('passport-jwt')
const UserStorage = require('../dao/storageUserMongo.js')
const CartStorage = require('../dao/storageCartMongo.js')
const {isValidPassword} = require('../../Utils/hashing.js')

const userStorage = new UserStorage()
const cartStorage = new CartStorage()

// We create a strategy
const LocalStrategy = local.Strategy 
const JWTStrategy = jwt.Strategy // Core of JWT Strategy
const ExtractJWT = jwt.ExtractJwt // JWT Extractor (for headers, cookie, etc)

// We create the cookieExtractor function
const cookieExtractor = req => {
    let token = null
    // We check there is a cookie to extract
    if(req && req.cookies) {
        token = req.cookies['jwtCookie'] // We extract the cookie
    }
    return token
}

const initializePassport = () => {
    
    // We register a new strategy with name 'register'
    passport.use('register', new LocalStrategy(
        // The strategy receives the options passReqToCallback and usernameField
        // The first one allows access to the request object
        // The second one sets which field will be used as username
        {passReqToCallback: true, usernameField: 'email'},
        // Then the strategy recieves a function with 4 arguments: the request object, the authentication fields and the resolution callback (done)
        async (req, username, password, done) => {
            // We get the data from the request body
            const {nickname, firstname, lastname, email, age} = req.body
            try {
                console.log('Starting strategy...')
                let user = await userStorage.getByEmail(username)
                if(user) {
                    console.log('User already exists')
                    // Done is the resolution callback. In this case, we return it with error as null and the user as false
                    return done(null, false)
                }
                let cart = await cartStorage.save([])
                let newUser = {
                    nickname: nickname,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    email: email,
                    age: age,
                    role: "user",
                    cart: cart._id
                }
                console.log("We are going to save the user...")
                let result = await userStorage.save(newUser)
                // We return the callback with no error and the user registered
                return done(null, result)
            }
            catch(error) {
                // We return the callback with just the error
                return done(`Error when registering user: ${error}`)
            }
        }
    )),

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async (username, password, done) => {
            try {
                const user = await userStorage.getByEmail(username)
                if(!user) {
                    console.log(`User with email ${username} doesn't exists`)
                    return done(null, false)
                }
                if(!isValidPassword(password, user.password)){
                    return done(null, false)
                }
                return done(null, user)
            }
            catch(error) {
                return done(error)
            }
        }
    ))

    passport.use('github', new GitHubStrategy(
        { 
            clientID: 'Iv1.76d609a69f7b980e', 
            clientSecret: '8a7aadeff7aaa635e9caa39e539dee11373e5961', 
            callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
        },
        async (accesToken, refreshToken, profile, done) => {
            try {
                console.log(profile) // Profile is the GitHub profile info
                let user = await userStorage.getByEmail(profile._json.email)
                if(!user) { // User doesn't exists in our site
                    let newUser = {
                        nickname: profile._json.login, // We fill out fields not present in GitHub
                        firstname: profile._json.name,
                        lastname: profile._json.login, // We fill out fields not present in GitHub
                        password: '', // Not necessary since we authenticate by a third party
                        email: profile._json.email
                    }
                    let result = await userStorage.save(newUser)
                    done(null, result)
                }
                else { // User already existis
                    done(null, user)
                }
            }
            catch(error) {
                return done(error)
            }
        }
    ))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'CookieS1e2c3r4e5t' // Check its the same as in app.js
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        }
        catch(error) {
            return done(error)
        }
    }))    
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    let user = await userStorage.getById(id)
    done(null, user)
})

module.exports = {initializePassport}