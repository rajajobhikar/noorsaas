import clientPromise from "@/lib-wkt3/wkt3db/mongo";

// ✅ Social login handler — Google ya GitHub ke liye
export async function handleSocialLogin(
  provider: "google" | "github",
  profile: any
) {
  const client = await clientPromise;
  const db = client.db("wkt3");

  const email = profile.email;

  // ✅ Pehle check karo ki email pehle se kisi method se bind hai
  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    if (existingUser.method !== provider) {
      // ✅ Agar method mismatch hai, toh login block kar do
      throw new Error(
        "❌ This email is already linked to another login method. Please use the same method."
      );
    }
    // ✅ Agar method match hai, toh allow karo
    return existingUser;
  }

  // ✅ Agar user pehli baar login kar raha hai, toh naya user create karo
  const newUser = {
    email,
    name: profile.name || "",
    method: provider, // "google" ya "github"
    role: "user",
    createdAt: Date.now(),
  };
  await db.collection("users").insertOne(newUser);
  return newUser;
}
