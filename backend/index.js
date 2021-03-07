const { ApolloServer } = require("apollo-server");
require("dotenv").config();
const mongoose = require("mongoose");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");
const contextMiddleware = require("./src/utils/contextMiddleware");

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

mongoose
  .connect(
    "mongodb+srv://fausta:lEWwAm1BixcLwrme@cluster0.uzb0m.mongodb.net/chat-app?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB Connected");
    return server.listen({ port: PORT });
  })
  .then(({ url }) => console.log(`Listening at ${url}`))
  .catch((err) => console.error(err));
