const adminMutations = require("./adminResolvers/adminMutations");
const gradeMutations = require("./gradeResolvers/gradeMutation");
const subjectMutations = require("./subjectResolvers/subjectMutation")
const adminQuerys = require("./adminResolvers/adminQuerys");
const gradeQuerys = require("./gradeResolvers/gradeQuerys")

const resolvers = {
  Query: {
    ...adminQuerys,
    ...gradeQuerys
  },
  Mutation: {
    ...gradeMutations,
    ...adminMutations,
    ...subjectMutations
  },
};

module.exports = resolvers;
