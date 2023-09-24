const { userModel } = require('./models/users.model.js')
const { createHash, isValidPassword } = require('../../Utils/hashing.js')

class Storage {

    async notExists(nickname) {
        try {
            let user = await userModel.findOne({ nickname: nickname })
            return !user ? true : false
        }
        catch (error) {
            throw new Error(`There was an error when checking for user ${nickname}`)
        }
    }

    async save(user) {
        try {
            const createdHash = createHash(user.password)
            const nickname = user.nickname
            const firstname = user.firstname
            const lastname = user.lastname
            const password = createdHash
            const email = user.email
            let exists = await userModel.findOne({ nickname: nickname } )
            if (!exists) {
                let result = await userModel.create({ nickname, firstname, lastname, password, email })
                return result
            }
            else {
                throw new Error(`Nickname ${nickname} already exists`)
            }
            
        }
        catch (error) {
            throw new Error('There was an error when saving user ' + error)
        }
    }

    async update(id, user) {
        try {
            let result = await userModel.updateOne({ _id: id }, user)
            return result
        }
        catch (error) {
            throw new Error('There was an error when updating user with id ' + id)
        }
    }

    async getById(id) {
        try {
            let user = await userModel.findById(id)
            return user
        }
        catch (error) {
            throw new Error('There was an error when getting user with id ' + id)
        }
    }

    async getByField(field, value) {
        try {
            console.log(`Field: ${field} Value: ${value}`)
            let user = await userModel.findOne({field: value})
            
            return user
        }
        catch (error) {
            throw new Error(`There was an error when getting user with ${field} ${value}`)
        }
    }

    async getAll() {
        try {
            let users = await userModel.find()
            return users
        }
        catch (error) {
            throw new Error('There was an error when getting all users')
        }
    }

    async deleteById(id) {
        try {
            let result = await userModel.deleteOne({ _id: id })
            return result
        }
        catch (error) {
            throw new Error('There was an error when deleting user with id ' + id)
        }
    }

    async deleteAll() {
        try {
            let result = await userModel.deleteAll()
            return result
        }
        catch (error) {
            throw new Error('There was an error when deleting all users')
        }
    }

    async getLoginInfo(nickname, password) {
        try {
            let user = await userModel.findOne({ nickname: nickname })
            const isValid = isValidPassword(password, user.password)
            if (isValid) {
                return user
            }
            else {
                throw new Error(`Password is not correct`)
            }
        }
        catch (error) {
            throw new Error(`${error}`)
        }
    }
}

module.exports = Storage