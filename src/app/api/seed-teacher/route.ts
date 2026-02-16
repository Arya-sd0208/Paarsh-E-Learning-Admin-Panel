import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  const exists = await User.findOne({ email: "teacher@paarsh.com" });
  if (exists) {
    return NextResponse.json({ message: "Teacher already exists" });
  }

  const hashedPassword = await bcrypt.hash("teacher123", 10);

  await User.create({
    name: "Test Teacher",
    email: "teacher@paarsh.com",
    password: hashedPassword,
    role: "teacher",
  });

  return NextResponse.json({ message: "Teacher created" });
}
