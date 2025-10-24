import clientPromise from "./mongo";
import type { User } from "@/types/User";
import { WithId, OptionalId } from "mongodb";

export async function addUser(user: Omit<User, '_id'>) {
   const client = await clientPromise;
   const db = client.db("wkt3");
   const users = db.collection<WithId<User>>("users");

   console.log("📦 Attempting to insert user:", user.email);
   const result = await users.insertOne(user as any);
   console.log("✅ Inserted user with ID:", result.insertedId);
   return { ...user, _id: result.insertedId };
 }

export async function findUserByEmail(email: string) {
   const client = await clientPromise;
   const db = client.db("wkt3");
   const users = db.collection<WithId<User>>("users");

   return await users.findOne({ email });
 }