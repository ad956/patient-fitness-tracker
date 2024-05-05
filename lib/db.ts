import { MongoClient } from "mongodb";

export default async function dbConfig() {
  const uri = "mongodb://localhost:27017/";
  // const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
  const client = await MongoClient.connect(uri);
  if (!client) {
    throw new Error("Error connecting mongodb.");
  }
  const db = client.db("pft");

  return db;
}
