import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  maxScore: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function GET(_req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const leaderboard = await User.find({}, { name: 1, email: 1, maxScore: 1, _id: 0 })
    .sort({ maxScore: -1 })
    .limit(10)
    .lean();

  let userInfo = null;
  if (session && session.user && session.user.email) {
    const allUsers = await User.find({}, { email: 1, maxScore: 1 }).sort({ maxScore: -1 }).lean();
    const userIdx = allUsers.findIndex(u => u.email === session.user!.email);
    if (userIdx !== -1) {
      userInfo = {
        rank: userIdx + 1,
        maxScore: allUsers[userIdx].maxScore,
      };
    }
  }

  return NextResponse.json({ leaderboard, user: userInfo });
} 