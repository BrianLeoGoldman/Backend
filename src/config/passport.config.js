const passport = require('passport')
const local = require('passport-local')
const Storage = require('../dao/storageUserMongo.js')
const {createHash} = require('../../Utils/hashing.js')

const storage = new Storage()

// We create a strategy
const LocalStrategy = local.Strategy 
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
            const {nickname, firstname, lastname, email} = req.body
            try {
                console.log('Starting strategy...')
                let user = await storage.getByField('email', username)
                if(user) {
                    console.log('User already exists')
                    // Done is the resolution callback. In this case, we return it with error as null and the user as false
                    return done(null, false)
                }
                let newUser = {
                    nickname: nickname,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    email: email
                }
                console.log("We are going to save the user...")
                let result = await storage.save(newUser)
                // We return the callback with no error and the user registered
                return done(null, result)
            }
            catch(error) {
                // We return the callback with just the error
                return done(`Error when registering user: ${error}`)
            }
        }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    let user = await storage.findById(id)
    done(null, user)
})

module.exports = {initializePassport}