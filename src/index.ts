import express from "express";
import createApolloGraphqlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

async function init() {
  // Create GraphQL Apollo Server

  app.get("/", (req, res) => {
    console.log(`server up and running`);
    res.json({ message: `server up and running` });
  });

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
}

// (async () => {
//   await server.start();
// })();

init();
