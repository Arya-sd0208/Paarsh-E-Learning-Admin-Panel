import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Subcategory from "@/models/Subcategory";
import Category from "@/models/Category"; // Ensure Category model is registered

export async function GET() {
  try {
    await connectDB();

    const subcategories = await Subcategory.find()
      .populate("category")
      .sort({ createdAt: -1 });

    return NextResponse.json(subcategories);
  } catch (error: any) {
    console.error("GET SUBCATEGORIES ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch subcategories", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const subcategory = await Subcategory.create(body);

  return NextResponse.json(subcategory, { status: 201 });
}