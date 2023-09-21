const { userModel } = require('./models/users.model.js')

class Storage {

    async save(user) {
        try {
            const firstname = user.firstname
            const lastname = user.lastname
            const email = user.email
            let result = await userModel.create({ firstname, lastname, email })
            return result
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
            return user
        }
        catch (error) {
            throw new Error('There was an error when getting login info')
        }
    }
}

module.exports = Storage