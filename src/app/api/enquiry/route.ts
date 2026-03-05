import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, college, education, course } = body;

   const data = await resend.emails.send({
  from: "Paarsh E-Learning <onboarding@resend.dev>",
  to: "paarshelearning@gmail.com",
  subject: `📩 New Course Enquiry - ${course}`,
  html: `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f8fb;padding:30px;">
    
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
      
      <!-- HEADER -->
      <div style="background:#0f172a;padding:20px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:20px;">
          Paarsh E-Learning
        </h1>
        <p style="color:#cbd5f5;margin:5px 0 0;font-size:13px;">
          New Course Enquiry Received
        </p>
      </div>

      <!-- BODY -->
      <div style="padding:25px;">
        <h2 style="margin-top:0;color:#111827;font-size:18px;">
          Student Enquiry Details
        </h2>

        <table style="width:100%;border-collapse:collapse;margin-top:15px;">
          
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Course</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${course}</td>
          </tr>

          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Student Name</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${name}</td>
          </tr>

          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Email</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${email}</td>
          </tr>

          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Phone</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${phone}</td>
          </tr>

          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">College</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${college}</td>
          </tr>

          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Education</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${education}</td>
          </tr>

        </table>

        <p style="margin-top:20px;color:#374151;font-size:14px;">
          Please contact this student as soon as possible.
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#6b7280;">
        © ${new Date().getFullYear()} Paarsh E-Learning  
        <br/>
        <a href="https://paarshelearning.com" style="color:#2563eb;text-decoration:none;">
          www.paarshelearning.com
        </a>
      </div>

    </div>

  </div>
  `,
});

    return NextResponse.json({ success: true, data });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}