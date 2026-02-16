import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    console.log("🌱 Seeding admin started...");

    // 1️⃣ Connect DB
    await connectDB();
    console.log("✅ Connected DB:", mongoose.connection.name);

    // 2️⃣ Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@paarsh.com",
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      return NextResponse.json({
        message: "Admin already exists",
        db: mongoose.connection.name,
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // 4️⃣ Create admin user
    const admin = await User.create({
      name: "Admin",
      email: "admin@paarsh.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("🎉 Admin created successfully");

    // 5️⃣ Return success
    return NextResponse.json({
      message: "Admin created successfully",
      admin,
      db: mongoose.connection.name,
    });
  } catch (error: any) {
    console.error("❌ SEED ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
