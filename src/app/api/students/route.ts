import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        const searchQuery = {
            role: "student",
            ...(search
                ? {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } },
                        { contact: { $regex: search, $options: "i" } },
                    ],
                }
                : {}),
        };

        const total = await User.countDocuments(searchQuery);

        const students = await User.find(searchQuery)
            .sort({ createdAt: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select("-password");

        return NextResponse.json(
            {
                students,
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
        console.error("Error fetching students:", error);
        return NextResponse.json(
            { message: "Failed to fetch students" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const studentData = {
            ...body,
            role: "student"
        };

        const student = await User.create(studentData);

        return NextResponse.json(
            { message: "Student created successfully", student },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating student:", error);
        return NextResponse.json(
            { message: "Failed to create student" },
            { status: 500 }
        );
    }
}
