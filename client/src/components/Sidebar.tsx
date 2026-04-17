"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  PhoneCall, 
  Settings, 
  BarChart3, 
  UserPlus, 
  ClipboardList,
  LogOut,
  Cpu
} from "lucide-react";

import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Lead Overview", href: "/leads" },
  { icon: PhoneCall, label: "Call Reports", href: "/calls" },
  { icon: ClipboardList, label: "Follow-ups", href: "/follow-ups" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: UserPlus, label: "Manage Users", href: "/users" },
  { icon: Cpu, label: "Automation", href: "/automation" },
  { icon: Settings, label: "Settings", href: "/settings" },

];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen sidebar-gradient flex flex-col text-white fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg active-nav-link flex items-center justify-center font-black text-xl">
            E
          </div>
          <h1 className="text-xl font-black tracking-tight text-white">EduLead CRM</h1>
        </div>

      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
              pathname === item.href 
                ? "active-nav-link" 
                : "text-slate-500 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              pathname === item.href ? "text-slate-900" : "group-hover:text-white"
            )} />
            <span className="font-bold text-sm">{item.label}</span>
          </Link>

        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
