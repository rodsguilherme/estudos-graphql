const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs } = require("graphql-tools");
const path = require("path");

const userSchema = require("./user/schema/user.graphql");
const usersResolvers = require("./user/resolvers/userResolvers");

const turmasResolvers = require("./turma/resolvers/turmaResolvers");
const turmaSchema = require("./turma/schema/turma.graphql");
const TurmasAPI = require("./turma/datasource/turma");

const UsersAPI = require("./user/datasource/user");

const dbConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "./data/database.db"),
  },
};

const typeDefs = mergeTypeDefs([userSchema, turmaSchema]);
const resolvers = [usersResolvers, turmasResolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    usersApi: new UsersAPI(),
    turmasApi: new TurmasAPI(dbConfig),
  }),
});

server
  .listen()
  .then(({ url }) => console.log(`Servidor rodando na porta ${url}`));
