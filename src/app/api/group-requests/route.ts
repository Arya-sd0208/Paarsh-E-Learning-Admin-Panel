import { connectDB } from "@/lib/db";
import GroupRequest from "@/models/GroupRequest";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        const query = status ? { status } : {};

        const requests = await GroupRequest.find(query)
            .populate("teacherId", "name email designation")
            .populate("participants.studentId", "name email contact")
            .sort({ createdAt: -1 });

        return NextResponse.json({ requests }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to fetch group requests", error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const newRequest = await GroupRequest.create(body);

        return NextResponse.json({ message: "Group request created successfully", request: newRequest }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to create group request", error: error.message }, { status: 500 });
    }
}
