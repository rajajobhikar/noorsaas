import { NextRequest, NextResponse } from "next/server";
import { users } from "@/lib-wkt3/authEngine/userStore";
import { logAudit } from "@/lib-wkt3/wkt3db/auditLogStore";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";


type InMemoryUser = {
  id: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
  role: string;
  banned: boolean;
};

export async function GET() {
  const client = await clientPromise;
  const db = client.db("users");
  const users = await db.collection("profiles").find().toArray();

  return NextResponse.json(users); // ✅ Must return an array
}


// export async function GET() {
//   return NextResponse.json({ users });
// }


export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Missing or invalid JSON body" },
      { status: 400 }
    );
  }

  const { action, userId } = body;
  if (!action || !userId) {
    return NextResponse.json(
      { error: "Missing action or userId" },
      { status: 400 }
    );
  }

  const user = users.find((u: InMemoryUser) => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  switch (action) {
    case "promote":
      user.role = "admin";
      logAudit({
        id: `a${Date.now()}`,
        actorId: "admin", // or session.userId
        action: "promote",
        targetId: user.id,
        context: "Manual promote from control panel",
        timestamp: Date.now(),
      });
      break;
    case "demote":
      user.role = "user";
      logAudit({
        id: `a${Date.now()}`,
        actorId: "admin", // or session.userId
        action: "demote",
        targetId: user.id,
        context: "Manual demote from control panel",
        timestamp: Date.now(),
      });
      break;
    case "unban":
      user.banned = false;
      logAudit({
        id: `a${Date.now()}`,
        actorId: "admin", // or session.userId
        action: "unban",
        targetId: user.id,
        context: "Manual unban from control panel",
        timestamp: Date.now(),
      });
      break;
    case "ban":
      user.banned = true;
      logAudit({
        id: `a${Date.now()}`,
        actorId: "admin", // or session.userId
        action: "ban",
        targetId: user.id,
        context: "Manual ban from control panel",
        timestamp: Date.now(),
      });
      break;

    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
  return NextResponse.json({ success: true, user });
}