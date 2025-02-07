import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

let uri: string;
if (process.env.NODE_ENV === "production") {
  uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
} else {
  uri = "mongodb://localhost:27017/";
}

export default async function dbConfig() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(uri, {
    dbName: "syncure",
  });

  connection.isConnected = db.connections[0].readyState;
}
