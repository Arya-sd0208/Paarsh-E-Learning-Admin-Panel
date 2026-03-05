import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Subcategory from "@/models/Subcategory";

export async function GET() {
  await connectDB();

  const subcategories = await Subcategory.find()
    .populate("category")
    .sort({ createdAt: -1 });

  return NextResponse.json(subcategories);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const subcategory = await Subcategory.create(body);

  return NextResponse.json(subcategory, { status: 201 });
}