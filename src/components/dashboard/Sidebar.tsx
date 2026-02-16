"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Users,
  GraduationCap,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  Briefcase,
  ClipboardCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();

  const adminMenu = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Enquiries", path: "/admin/enquiries", icon: MessageSquare },
    { name: "Students", path: "/admin/students", icon: GraduationCap },
    { name: "Teachers", path: "/admin/teachers", icon: Users },
    { name: "Consent", path: "/admin/concent", icon: ClipboardCheck },
    { name: "Blogs", path: "/admin/blogs", icon: FileText },
    { name: "Placement", path: "/admin/placement", icon: Briefcase },
    { name: "Reports", path: "/admin/reports", icon: BarChart3 },
    { name: "Payments", path: "/admin/payments", icon: CreditCard },
    { name: "Testimonials", path: "/admin/testimonial", icon: FileText },
    { name: "Workshops", path: "/admin/workshops", icon: BookOpen },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const menu = adminMenu;

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-gray-50 border-r border-gray-200 
                 h-[calc(100vh-64px)] 
                 overflow-y-auto
                 sticky top-16
                 pt-6
                 px-3
                 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
    >
      <ul className="space-y-2">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium 
                transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
