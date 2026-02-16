import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  const exists = await User.findOne({ email: "student@paarsh.com" });
  if (exists) {
    return NextResponse.json({ message: "Student already exists" });
  }

  const hashedPassword = await bcrypt.hash("student123", 10);

  await User.create({
    name: "Test Student",
    email: "student@paarsh.com",
    password: hashedPassword,
    role: "student",
  });

  return NextResponse.json({ message: "Student created" });
}
