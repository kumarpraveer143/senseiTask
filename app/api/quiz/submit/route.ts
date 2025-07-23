import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  maxScore: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { score } = await req.json();
  if (typeof score !== "number" || score < 0 || score > 100) {
    return NextResponse.json({ error: "Invalid score" }, { status: 400 });
  }
  const email = session.user.email;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, name: session.user.name, maxScore: score });
  } else if (score > (user.maxScore || 0)) {
    user.maxScore = score;
    await user.save();
  }
  return NextResponse.json({ success: true, maxScore: user.maxScore });
} 