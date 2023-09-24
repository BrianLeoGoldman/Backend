const bcrypt = require('bcrypt')

function createHash (password) { 
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

function isValidPassword(nonHashed, hashed) {
    return bcrypt.compareSync(nonHashed, hashed)
}

module.exports = { createHash, isValidPassword }
