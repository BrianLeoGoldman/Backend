const jwt = require('jsonwebtoken')

// The key is used when cyphering the token
const PRIVATE_KEY = 'CoderKeyTahtServesAsASecret'

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

const authToken = (req, res, next) => {
    // Token is in the headers of the request
    const authHeader = req.headers.authorization
    // If there is no headers, its because there is no token, therefore its not authenticated
    if(!authHeader) {
        return res.status(401).send({error: 'Not authenticated'})
    }
    // We remove the word 'Bearer' form the header
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        // Jwt verifies the existing token and checks if it is valid, altered or expired
        if(error) {
            return res.status(403).send({error: 'Not Authorized'})
        }
        // If all is good, token is decyphered and user is sent
        req.user = credentials.user
        next()
    })
}