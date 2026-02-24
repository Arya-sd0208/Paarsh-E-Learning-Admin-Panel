import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        // If status is 'all', fetch everything. Otherwise default to 'approved'
        const filter = status === "all" ? {} : { status: "approved" };

        const total = await Testimonial.countDocuments(filter);
        const testimonials = await Testimonial.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            data: testimonials,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        console.log("Creating testimonial in DB:", mongoose.connection.name);

        const newTestimonial = await Testimonial.create(body);

        return NextResponse.json({
            success: true,
            data: newTestimonial,
            db: mongoose.connection.name
        });
    } catch (error: any) {
        console.error("DB Insert Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

