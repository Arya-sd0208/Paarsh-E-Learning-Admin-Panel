import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const path = req.nextUrl.pathname;

  // Allow auth pages
  if (path === "/signin" || path === "/signup" || path === "/forgot-password" || path === "/reset-password") {
    return NextResponse.next();
  }

  // If no token → redirect to signup
  if (!token) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  // Role-based protection
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (path.startsWith("/teacher") && role !== "teacher") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (path.startsWith("/student") && role !== "student") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}



// // src/middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const path = req.nextUrl.pathname;

//    if (path.startsWith("/dashboard") && !token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
  
//   if (!token && path !== "/login") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (token) {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

//     if (path.startsWith("/admin") && decoded.role !== "admin")
//       return NextResponse.redirect(new URL("/login", req.url));

//     if (path.startsWith("/teacher") && decoded.role !== "teacher")
//       return NextResponse.redirect(new URL("/login", req.url));

//     if (path.startsWith("/student") && decoded.role !== "student")
//       return NextResponse.redirect(new URL("/login", req.url));
//   }
// }
