const passport = require('passport')

// Middleware for error message handling
const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(
            strategy, 
            function(error, user, info) {
                if(error) {
                    return next(error)
                }
                if(!user) {
                    return res.status(401).send({error:info.messages?info.messages:info.toString()})
                }
                req.user = user
                next()
            })(req, res, next)
    }
}

// Middleware for role authorization
const authorization = (role) => {
    return async(req, res, next) => {
        if(!req.user) {
            return res.status(401).send({error: 'Unauthorized'})
        }
        if(req.user.role != role) {
            return res.status(403).send({error: 'No permission'})
        }
        next()
    }
}

module.exports = {passportCall, authorization}