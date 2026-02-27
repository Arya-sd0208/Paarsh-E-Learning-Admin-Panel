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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const roleCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="));

    if (roleCookie) {
      setRole(roleCookie.split("=")[1]);
    }

    // Restore collapsed state from localStorage
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") setSidebarCollapsed(true);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  };

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
        <Sidebar
          role={role}
          collapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
          {children}
        </main>
      </div>
    </div>
  );
}
