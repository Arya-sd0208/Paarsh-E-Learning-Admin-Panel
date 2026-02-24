import { connectDB } from "@/lib/db";
import GroupRequest from "@/models/GroupRequest";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();

        const updatedRequest = await GroupRequest.findByIdAndUpdate(id, body, { new: true })
            .populate("teacherId", "name")
            .populate("participants.studentId", "name");

        if (!updatedRequest) {
            return NextResponse.json({ message: "Request not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Update successful", request: updatedRequest }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Update failed", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        await GroupRequest.findByIdAndDelete(id);
        return NextResponse.json({ message: "Request deleted" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Deletion failed", error: error.message }, { status: 500 });
    }
}
