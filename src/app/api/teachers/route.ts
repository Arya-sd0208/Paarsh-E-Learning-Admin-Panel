import { connectDB } from "@/lib/db";
import Teacher from "@/models/Teachers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        let page = parseInt(searchParams.get("page") || "1");
        let limit = parseInt(searchParams.get("limit") || "10");

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const searchQuery = search
            ? {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { course: { $regex: search, $options: "i" } },
                ],
            }
            : {};

        const total = await Teacher.countDocuments(searchQuery);

        const teachers = await Teacher.find(searchQuery)
            .sort({ createdAt: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return NextResponse.json(
            {
                teachers,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching teachers:", error);
        return NextResponse.json(
            {
                message: "Failed to fetch teachers",
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const teacher = await Teacher.create(body);

        return NextResponse.json(
            { message: "Teacher created successfully", teacher },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating teacher:", error);
        return NextResponse.json(
            { message: "Failed to create teacher", error: error.message },
            { status: 500 }
        );
    }
}
