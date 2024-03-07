const adminMutations = require("./adminResolvers/adminMutations");
const adminQuerys = require("./adminResolvers/adminQuerys");

const resolvers = {
  Query: {
    ...adminQuerys,
  },
  Mutation: {
    ...adminMutations,
  },
};

module.exports = resolvers;
