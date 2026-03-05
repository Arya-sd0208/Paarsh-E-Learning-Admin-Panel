import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { name, email, phone, course } = await req.json();

    await resend.emails.send({
      from: "Paarsh E-Learning <onboarding@resend.dev>",
      to: "paarshelearning@gmail.com",
      subject: `📥 Syllabus Download - ${course}`,
      html: `
        <h2>New Syllabus Download Request</h2>

        <p><b>Course:</b> ${course}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("Syllabus API Error:", error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}