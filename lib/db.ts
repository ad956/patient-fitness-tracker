import { MongoClient } from "mongodb";

export default async function dbConfig() {
  let uri: string;
  if (process.env.NODE_ENV === "production") {
    uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
  } else {
    uri = "mongodb://localhost:27017/";
  }

  const client = await MongoClient.connect(uri);
  if (!client) {
    throw new Error("Error connecting mongodb.");
  }
  const db = client.db("pft");

  return db;
}
