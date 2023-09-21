const { userModel } = require('./models/users.model.js')

class Storage {

    async notExists(username) {
        try {
            let user = await userModel.findOne({ username: username })
            return !user ? true : false
        }
        catch (error) {
            throw new Error(`There was an error when checking for user ${username}`)
        }
    }

    async save(user) {
        try {
            const username = user.username
            const firstname = user.firstname
            const lastname = user.lastname
            const password = user.password
            const email = user.email
            let exists = await userModel.findOne( {username : username} )
            if (!exists) {
                let result = await userModel.create({ username, firstname, lastname, password, email })
                return result
            }
            else {
                throw new Error(`Username ${username} already exists`)
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

    async getLoginInfo(username, password) {
        try {
            let user = await userModel.findOne({ username: username })
            if (user.password == password) {
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