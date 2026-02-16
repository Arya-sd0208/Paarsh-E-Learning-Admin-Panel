"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) setRole(userRole);
  }, []);

  if (!role) return null;

  return (
    <div className="flex">
      <Sidebar role={role} />

      <div className="flex-1">
        <Topbar role={role} />
        <div className="p-6 bg-gray-50 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
