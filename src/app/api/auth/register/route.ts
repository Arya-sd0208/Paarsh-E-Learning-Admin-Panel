// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import { signToken } from "@/lib/jwt";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//     try {
//         await connectDB();
//         const { name, email, password } = await req.json();

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return NextResponse.json(
//                 { message: "User already exists with this email" },
//                 { status: 400 }
//             );
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//         });

//         const token = signToken({
//             id: user._id,
//             role: user.role,
//         });

//         return NextResponse.json(
//             {
//                 token,
//                 role: user.role,
//                 message: "Registration successful"
//             },
//             { status: 201 }
//         );
//     } catch (error: any) {
//         console.error("Registration error:", error);
//         return NextResponse.json(
//             { message: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }



import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { name, email, password, contact } = await req.json();
        console.log("Registration attempt:", { name, email, contact });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists with this email" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            contact,
        });

        console.log("User created in DB:", user);

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            throw new Error("Email credentials are missing in environment variables");
        }


        // ✅ Send Welcome Email
        // const transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASSWORD,
        //     },
        // });

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });


        await transporter.sendMail({
            from: `"Paarsh E-Learning" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome to Paarsh E-Learning 🎉",
            html: `
                <h2>Hello ${name},</h2>
                <p>Your account has been created successfully.</p>
                <p>We’re excited to have you on board </p>
                <br/>
                <p>Start exploring courses now!</p>
            `,
        });

        const token = signToken({
            id: user._id,
            role: user.role,
        });

        return NextResponse.json(
            {
                token,
                role: user.role,
                message: "Registration successful. Email sent!"
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
