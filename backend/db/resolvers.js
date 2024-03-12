const adminMutations = require("./adminResolvers/adminMutations");
const gradeMutations = require("./gradeResolvers/gradeMutation");
const adminQuerys = require("./adminResolvers/adminQuerys");

const resolvers = {
  Query: {
    ...adminQuerys,
  },
  Mutation: {
    ...gradeMutations,
    ...adminMutations
    
  },
};

module.exports = resolvers;
