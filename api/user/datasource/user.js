const { RESTDataSource } = require('apollo-datasource-rest')


class UsersAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3001'
    }

    async getUsers() {
        const users = await this.get('/users')

        return users.map(async user => ({
            ...user,
            role: await this.get(`/roles/${user.role}`)
        }))
    }

    async getUserById(id) {
        const user = await this.get(`/users/${id}`)
        return {
            ...user,
            role: await this.get(`/roles/${user.role}`)
        }

    }

    async addUser(user) {
        const users = await this.get('/users')

        user.id = users.length + 1

        const [role] = await this.get(`/roles?type=${user.role}`)
        return {
            ...user,
            role: {
                ...role,
                id: role.id + 1,
            }
        }
    }

    async updateUser(user) {
        const users = await this.get(`/users/${user.id}`)

        const [role] = await this.get(`/roles?type=${user.role}`)


        return {
            ...users,
            ...user,
            role: {
                ...role
            }
        }
    }
}

module.exports = UsersAPI