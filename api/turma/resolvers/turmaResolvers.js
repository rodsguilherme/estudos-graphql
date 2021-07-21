const turmas = [
    {
        id: 1,
        descricao: 'basico'
    },
    {
        id: 2,
        descricao: 'avançado'
    }
]

const turmaResolvers = {
    Query: {
        turmas: (parent, args, context, info) => turmas
    },
};

module.exports = turmaResolvers