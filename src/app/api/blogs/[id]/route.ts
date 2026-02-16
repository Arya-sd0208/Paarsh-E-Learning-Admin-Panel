import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
       
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const blog = await Blog.findById(params.id);

        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ blog }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { message: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}

// PUT - Update blog
export async function PUT(
    req: Request,
    { params }: { params: {id: string } }
) {
    try {
        await connectDB();
        const body = await req.json();

        const blog = await Blog.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Blog updated successfully", blog },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating blog:", error);
        return NextResponse.json(
            { message: "Failed to update blog" },
            { status: 500 }
        );
    }
}

// DELETE blog
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const blog = await Blog.findByIdAndDelete(params.id);

        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Blog deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting blog:", error);
        return NextResponse.json(
            { message: "Failed to delete blog" },
            { status: 500 }
        );
    }
}
