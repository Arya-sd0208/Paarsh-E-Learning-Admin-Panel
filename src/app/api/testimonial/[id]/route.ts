import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();

        const updated = await Testimonial.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error("Error updating testimonial:", error);
        return NextResponse.json(
            { message: "Failed to update testimonial", error: error.message },
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
        const deleted = await Testimonial.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting testimonial:", error);
        return NextResponse.json(
            { message: "Failed to delete testimonial", error: error.message },
            { status: 500 }
        );
    }
}



