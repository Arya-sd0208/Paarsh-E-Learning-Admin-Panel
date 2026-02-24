
import { connectDB } from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // 1. Save to Database
        const inquiry = await Inquiry.create(body);

        // 2. Send Email Notification
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: "info@paarshelearning.com", // Recipient email
                subject: `New Inquiry: ${body.course_name || "General Inquiry"}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2 style="color: #2C4276;">New Inquiry Received</h2>
                        <p><strong>Name:</strong> ${body.name}</p>
                        <p><strong>Email:</strong> ${body.email}</p>
                        <p><strong>Phone:</strong> ${body.phone}</p>
                        <p><strong>Course/Topic:</strong> ${body.course_name || "N/A"}</p>
                        <p><strong>College:</strong> ${body.college || "N/A"}</p>
                        <p><strong>Education:</strong> ${body.education || "N/A"}</p>
                        <p><strong>Message:</strong> ${body.message || "N/A"}</p>
                        <hr />
                        <p style="font-size: 12px; color: #777;">This is an automated notification from Paarsh E-Learning.</p>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);
        } catch (mailError) {
            console.error("Email sending failed:", mailError);
            // We don't return error here because the DB save was successful
        }

        return NextResponse.json(
            { message: "Inquiry submitted successfully", inquiry },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Inquiry API Error:", error);
        return NextResponse.json(
            { message: "Failed to submit inquiry" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const skip = (page - 1) * limit;

        const query: any = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { course_name: { $regex: search, $options: "i" } }
            ];
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                query.createdAt.$lte = end;
            }
        }

        const [inquiries, total] = await Promise.all([
            Inquiry.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Inquiry.countDocuments(query)
        ]);

        return NextResponse.json({
            inquiries,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Failed to fetch inquiries" },
            { status: 500 }
        );
    }
}

