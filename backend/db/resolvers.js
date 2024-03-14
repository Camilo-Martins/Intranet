const adminMutations = require("./adminResolvers/adminMutations");
const gradeMutations = require("./gradeResolvers/gradeMutation");
const subjectMutations = require("./subjectResolvers/subjectMutation")
const adminQuerys = require("./adminResolvers/adminQuerys");

const resolvers = {
  Query: {
    ...adminQuerys,
  },
  Mutation: {
    ...gradeMutations,
    ...adminMutations,
    ...subjectMutations
  },
};

module.exports = resolvers;
