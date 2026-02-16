"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";

export default function Topbar({ role }: { role: string }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/signin");
  };

  return (
    <div
      className="h-16 
                 bg-white/90 backdrop-blur-md
                 border-b border-gray-200
                 shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                 sticky top-0 z-50
                 flex items-center justify-between px-6"
    >
      {/* LEFT - LOGO */}
      <div className="flex items-center">
        <Image
          src="/logo-wide.webp"
          alt="Paarsh E-learning"
          width={170}
          height={60}
          className="object-contain"
          priority
        />
      </div>

      {/* RIGHT - LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-full
                   bg-gray-100 hover:bg-gray-200
                   text-gray-700 text-sm font-medium
                   transition-all duration-200"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
