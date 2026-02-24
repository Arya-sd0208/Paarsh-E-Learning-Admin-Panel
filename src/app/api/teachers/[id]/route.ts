import { connectDB } from "@/lib/db";
import Teacher from "@/models/Teachers";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
        }

        return NextResponse.json({ teacher }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching teacher:", error);
        return NextResponse.json(
            { message: "Failed to fetch teacher", error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();

        const teacher = await Teacher.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!teacher) {
            return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Teacher updated successfully", teacher },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating teacher:", error);
        return NextResponse.json(
            { message: "Failed to update teacher", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const teacher = await Teacher.findByIdAndDelete(id);

        if (!teacher) {
            return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Teacher deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting teacher:", error);
        return NextResponse.json(
            { message: "Failed to delete teacher", error: error.message },
            { status: 500 }
        );
    }
}
