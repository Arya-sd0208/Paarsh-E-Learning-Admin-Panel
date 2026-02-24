import { connectDB } from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const inquiry = await Inquiry.findById(id);
        if (!inquiry) {
            return NextResponse.json({ message: "Inquiry not found" }, { status: 404 });
        }
        return NextResponse.json(inquiry);
    } catch (error: unknown) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const body = await req.json();
        const inquiry = await Inquiry.findByIdAndUpdate(id, body, { new: true });
        if (!inquiry) {
            return NextResponse.json({ message: "Inquiry not found" }, { status: 404 });
        }
        return NextResponse.json(inquiry);
    } catch (error: unknown) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const inquiry = await Inquiry.findByIdAndDelete(id);
        if (!inquiry) {
            return NextResponse.json({ message: "Inquiry not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Inquiry deleted successfully" });
    } catch (error: unknown) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
    }
}
