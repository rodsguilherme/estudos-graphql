const turmaResolvers = {
  Query: {
    turmas: (_, __, { dataSources }) => dataSources.turmasApi.getTurmas(),
    turma: (_, { id }, { dataSources }) => dataSources.turmasApi.getTurma(id),
  },
  Mutation: {
    addTurma: (_, { turma }, { dataSources }) =>
      dataSources.turmasApi.addTurma(turma),
    updateTurma: (root, args, { dataSources }) =>
      dataSources.turmasApi.updateTurma(args),
    deleteTurma: (_, { id }, { dataSources }) =>
      dataSources.turmasApi.deleteTurma(id),
  },
};

module.exports = turmaResolvers;
