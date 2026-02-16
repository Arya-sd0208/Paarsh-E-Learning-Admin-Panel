import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const student = await User.findOne({ _id: params.id, role: "student" }).select("-password");
        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }
        return NextResponse.json(student, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error fetching student" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const body = await req.json();
        const updatedStudent = await User.findOneAndUpdate(
            { _id: params.id, role: "student" },
            { $set: body },
            { new: true }
        ).select("-password");

        if (!updatedStudent) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json(updatedStudent, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error updating student" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const deletedStudent = await User.findOneAndDelete({ _id: params.id, role: "student" });
        if (!deletedStudent) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error deleting student" }, { status: 500 });
    }
}
