import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const student = await User.findOne({ _id: id, role: "student" }).select("-password");
        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }
        return NextResponse.json(student, { status: 200 });
    } catch (error: any) {
        console.error("❌ Error fetching student:", error);
        return NextResponse.json({ message: "Error fetching student", error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();
        const updatedStudent = await User.findOneAndUpdate(
            { _id: id, role: "student" },
            { $set: body },
            { new: true }
        ).select("-password");

        if (!updatedStudent) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json(updatedStudent, { status: 200 });
    } catch (error: any) {
        console.error("❌ Error updating student:", error);
        return NextResponse.json({ message: "Error updating student", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const deletedStudent = await User.findOneAndDelete({ _id: id, role: "student" });
        if (!deletedStudent) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("❌ Error deleting student:", error);
        return NextResponse.json({ message: "Error deleting student", error: error.message }, { status: 500 });
    }
}
