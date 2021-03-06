import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

async function initServer() {
  const PORT = process.env.PORT || 5000;
  const app = express();
  app.use(cors());
  dotenv.config();

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, () =>
    console.log(`Express server is running on port ${PORT}`)
  );
}

initServer();
