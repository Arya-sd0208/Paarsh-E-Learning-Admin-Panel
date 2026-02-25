"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export default function RouteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/teacher") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/entrance-exam") ||
    pathname.startsWith("/entrance_exam") ||
    pathname.startsWith("/entrance exam");


  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
