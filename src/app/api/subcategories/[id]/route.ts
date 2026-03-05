import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Subcategory from "@/models/Subcategory";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();

  const updated = await Subcategory.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Subcategory.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Deleted successfully" });
}