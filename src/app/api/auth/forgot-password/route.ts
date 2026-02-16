// import { Resend } from 'resend';
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const { email } = await req.json();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { message: "If an account exists with this email, you will receive a reset link." },
//         { status: 200 }
//       );
//     }

//     // Generate reset token
//     const resetToken = Buffer.from(`${email}|${Date.now()}`).toString('base64');
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
//     const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

//     // Send email using Resend (server-side, no configuration needed)
//     try {
//       const { data, error } = await resend.emails.send({
//         from: 'Paarsh E-Learning <onboarding@resend.dev>', // Free tier sender
//         to: [email],
//         subject: 'Password Reset Request - Paarsh E-learning',
//         html: `
//           <!DOCTYPE html>
//           <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//               .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//               .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//               .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
//               .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white !important; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
//               .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <div class="header">
//                 <h1>Password Reset Request</h1>
//               </div>
//               <div class="content">
//                 <p>Hello,</p>
//                 <p>You requested a password reset for your Paarsh E-learning account.</p>
//                 <p>Click the button below to reset your password:</p>
//                 <p style="text-align: center;">
//                   <a href="${resetLink}" class="button">Reset Password</a>
//                 </p>
//                 <p>Or copy and paste this link into your browser:</p>
//                 <p style="word-break: break-all; color: #667eea;">${resetLink}</p>
//                 <p><strong>This link will expire in 1 hour.</strong></p>
//                 <p>If you didn't request this password reset, please ignore this email.</p>
//                 <p>Best regards,<br>Paarsh E-Learning Team</p>
//               </div>
//               <div class="footer">
//                 <p>© 2026 Paarsh E-Learning. All rights reserved.</p>
//               </div>
//             </div>
//           </body>
//           </html>
//         `,
//       });

//       if (error) {
//         console.error('Resend error:', error);
//         return NextResponse.json(
//           { message: "Failed to send reset email. Please try again later." },
//           { status: 500 }
//         );
//       }

//       console.log(`✅ Password reset email sent to: ${email}`, data);
//       return NextResponse.json(
//         { message: "Password reset email sent successfully" },
//         { status: 200 }
//       );
//     } catch (emailError) {
//       console.error("Email sending error:", emailError);
//       return NextResponse.json(
//         { message: "Failed to send reset email. Please try again later." },
//         { status: 500 }
//       );
//     }
//   } catch (error: any) {
//     console.error("Forgot password error:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


import { Resend } from "resend";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY missing");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "If account exists, reset link sent." },
        { status: 200 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

    await user.save();

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:9002";

    const resetLink =
      `${baseUrl}/reset-password?token=${resetToken}`;

    const { error } = await resend.emails.send({
      from: "Paarsh E-Learning <onboarding@resend.dev>",
      to: [email],
      subject: "Password Reset",
      html: `<a href="${resetLink}">Reset Password</a>`
    });

    if (error) throw error;

    return NextResponse.json(
      { message: "Reset email sent" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
