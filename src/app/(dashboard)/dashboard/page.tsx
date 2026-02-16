"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { role, token } = useSelector((state: RootState) => state.auth);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!role) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  // 🎯 ROLE-BASED DASHBOARD
  if (role === "admin") return <AdminDashboard />;
  if (role === "student") return <StudentDashboard />;
  if (role === "teacher") return <TeacherDashboard />;

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-red-500">Unauthorized access</p>
    </div>
  );
}
