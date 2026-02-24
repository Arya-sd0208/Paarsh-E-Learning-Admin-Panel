"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  PenBox,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();

  const adminMenu = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
    {
      name: "Entrance Exam",
      icon: PenBox,
      subItems: [
        { name: "College Management", path: "/admin/entrance/management" },
        { name: "Students", path: "/admin/entrance/sstudents" },
        { name: "Entrance Management", path: "/admin/entrance/entrance-management" },
        { name: "Entrance Test Logs", path: "/admin/entrance/entrance-test-logs" },
        { name: "Bulk Upload Questions", path: "/admin/entrance/bulk-upload" },
      ]
    },
    { name: "Students", path: "/admin/students", icon: GraduationCap },
    { name: "Teachers", path: "/admin/teachers", icon: Users },
    { name: "Group Consent", path: "/admin/group-management", icon: ClipboardCheck },
    { name: "Blogs", path: "/admin/blogs", icon: FileText },
    { name: "Placement", path: "/admin/placement", icon: Briefcase },
    { name: "Reports", path: "/admin/reports", icon: BarChart3 },
    { name: "Payments", path: "/admin/payments", icon: CreditCard },
    { name: "Testimonials", path: "/admin/testimonial", icon: FileText },
    { name: "Workshops", path: "/admin/workshops", icon: BookOpen },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(prev => prev === name ? null : name);
  };

  const menu = adminMenu;

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white border-r border-gray-100 shadow-sm
                 flex flex-col
                 h-full
                 relative z-30
                 overflow-y-auto
                 pt-4
                 px-3
                 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
      <ul className="space-y-1">
        {menu.map((item) => {
          const hasSubItems = 'subItems' in item && item.subItems && item.subItems.length > 0;
          const isActive = 'path' in item ? pathname === item.path : false;
          const isSubmenuActive = hasSubItems && 'subItems' in item && item.subItems.some(sub => pathname === sub.path);
          const isOpen = openSubmenu === item.name || isSubmenuActive;

          return (
            <li key={item.name} className="select-none">
              {hasSubItems ? (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                    ${isSubmenuActive
                        ? "text-blue-600 bg-blue-50/30"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={isSubmenuActive ? "text-blue-600" : "text-gray-400"} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${isSubmenuActive ? "text-blue-600" : "text-gray-400"}`}
                    />
                  </button>
                  {isOpen && 'subItems' in item && (
                    <ul className="mt-1 ml-4 space-y-1 border-l border-gray-200 pl-4">
                      {item.subItems.map((sub) => {
                        const isSubActive = pathname === sub.path;
                        return (
                          <li key={sub.name}>
                            <Link
                              href={sub.path}
                              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200
                                   ${isSubActive
                                  ? "text-blue-600 font-semibold bg-blue-50/80"
                                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                                }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all
                                  ${isSubActive
                                    ? "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                                    : "bg-gray-400"
                                  }`}
                              />
                              <span className="truncate">{sub.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                'path' in item && item.path && (
                  <Link href={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium 
                    transition-all duration-200
                    ${isActive
                        ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                      }`}>
                    <item.icon size={18} className={isActive ? "text-blue-600" : "text-gray-400"} />
                    {item.name}
                  </Link>
                )
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
