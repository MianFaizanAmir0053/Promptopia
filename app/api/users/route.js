import { connectToDatabase } from "@utils/database";
import User from "@models/user";

export async function GET(req) {
  try {
    await connectToDatabase();
    const users = await User.find({}).sort({ createdAt: -1 });
    console.log(users);
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get Users", { status: 500 });
  }
}
