const { GraphQLScalarType } = require('graphql')


const usersResolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'data',
        serialize: (value) => value.toISOString(),
        parseValue: value => new Date(value),
        parseLiteral: ast => new Date(ast.value)
    }),
    Query: {
        users: (root, args, { dataSources }) => dataSources.usersApi.getUsers(),
        user:( root, { id }, { dataSources }) => dataSources.usersApi.getUserById(id)
    },
    Mutation: {
        addUser: (root, args, {dataSources}) =>  dataSources.usersApi.addUser(args.user),
        updateUser: (root, args, {dataSources}) => dataSources.usersApi.updateUser(args)
    }
}

module.exports = usersResolvers