"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="));

    if (roleCookie) {
      setRole(roleCookie.split("=")[1]);
    }
  }, []);

  if (!role) {
    return (
      <div className="flex items-center justify-center h-screen">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col">
        <Topbar role={role} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}



// import DashboardLayout from "@/components/dashboard/DashboardLayout";

// export default function Layout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <DashboardLayout>{children}</DashboardLayout>;
// }
