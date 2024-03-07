const { ApolloServer } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let token;
    token = req.headers["authorization"];

    if (!token) {
     return "Token has been expired."
    } 

    if (token.startsWith("Bearer")) {
      token = req.headers["authorization"].split(" ")[1] || "";
    }
    
    try {
      const user = jwt.verify(
        token,
        process.env.SECRET
      );

      return {
        user,
      };
    } catch (error) {
      console.log(error);
    }

  },
});

server.listen().then(({ url }) => {
  console.log(`Servidor listo en ${url}`);
});
