import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

async function init() {
  // Create GraphQL Apollo Server
  const server = new ApolloServer({
    typeDefs: `
        type Query{
            hello:String
        }
      `,
    resolvers: {
      Query: {
        hello: () => "hello world",
      },
    },
  });

  app.get("/", (req, res) => {
    console.log(`server up and running`);
    res.json({ message: `server up and running` });
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
}

// (async () => {
//   await server.start();
// })();

init();
