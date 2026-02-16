// // src/app/api/auth/login/route.ts
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import { signToken } from "@/lib/jwt";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   await connectDB();
//   const { email, password } = await req.json();

//   const user = await User.findOne({ email });
//   if (!user) {
//     return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
//   }

//   const token = signToken({
//     id: user._id,
//     role: user.role,
//   });

//   return NextResponse.json({ token, role: user.role });
// }



import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user._id,
      role: user.role || "student",
    });

    return NextResponse.json({
      token,
      role: user.role || "student",
      message: "Login successful",
    });

  } catch (error: any) {
    console.log("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

