import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global reuse in dev
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGO_URL) {
  throw new Error("❌ MONGO_URL not defined in .env");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;