import { ApolloServer } from "@apollo/server";
import { User } from "./user";
async function createApolloGraphqlServer() {
  const server = new ApolloServer({
    typeDefs: `
            ${User.typeDefs}
            type Query{
                ${User.queries}
                getContext: String
            }
            type Mutation {
              ${User.mutations}
            }
          `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        getContext: (_: any, parameters: any, context) => {
          return "okay";
        },
      },
      Mutation: { ...User.resolvers.mutations },
    },
  });

  await server.start();

  return server;
}

export default createApolloGraphqlServer;
