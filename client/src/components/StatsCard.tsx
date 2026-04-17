import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string;
  trend: string;
  trendType: "up" | "down";
  icon: LucideIcon;
  color: string;
}

export function StatsCard({ label, value, trend, trendType, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="glass-card p-6 rounded-[24px] flex flex-col gap-4 animate-fade-in border-none shadow-none bg-white/[0.03]">
      <div className="flex justify-between items-start">
        <div className={cn("p-2.5 rounded-xl bg-white/5")}>
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <span className={cn(
          "text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest",
          trendType === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
        )}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{label}</p>
        <h3 className="text-3xl font-black mt-1 text-white tabular-nums">{value}</h3>
      </div>
    </div>

  );
}
