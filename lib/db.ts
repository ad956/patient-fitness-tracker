import { MongoClient } from "mongodb";

export default async function dbConfig() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
  const client = await MongoClient.connect(uri);
  if (!client) {
    throw new Error("Function not implemented.");
  }
  const db = client.db("pft");

  return db;
}
