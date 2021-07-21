const { ApolloServer } = require('apollo-server')
const { mergeTypeDefs } = require('graphql-tools')

const userSchema = require('./user/schema/user.graphql')
const usersResolvers = require('./user/resolvers/userResolvers')

const turmasResolvers = require('./turma/resolvers/turmaResolvers')
const turmaSchema = require('./turma/schema/turma.graphql')

const UsersAPI = require('./user/datasource/user')



const typeDefs = mergeTypeDefs([userSchema, turmaSchema])
const resolvers = [usersResolvers, turmasResolvers]


const server = new ApolloServer({
    typeDefs, resolvers, dataSources: () => {
        return {
            usersApi: new UsersAPI(),
        }
    }
})

server.listen().then(({ url }) => console.log(`Servidor rodando na porta ${url}`))