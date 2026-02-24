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
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Topbar role={role} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar role={role} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
          {children}
        </main>
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
