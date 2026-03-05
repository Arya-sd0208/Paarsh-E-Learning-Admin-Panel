import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    await resend.emails.send({
      from: "Paarsh E-Learning <onboarding@resend.dev>",
      to: "paarshelearning@gmail.com",
      subject: `📩 New Contact Message from ${name}`,
      html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f8fb;padding:30px;">
        
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;border:1px solid #e5e7eb;">
          
          <div style="background:#0f172a;padding:20px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;font-size:20px;">
              Paarsh E-Learning
            </h1>
            <p style="color:#cbd5f5;margin:5px 0 0;font-size:13px;">
              New Contact Message
            </p>
          </div>

          <div style="padding:25px;">

            <table style="width:100%;border-collapse:collapse;">
              
              <tr>
                <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Name</td>
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
                <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Message</td>
                <td style="padding:10px;border:1px solid #e5e7eb;">${message}</td>
              </tr>

            </table>

          </div>

        </div>
      </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}