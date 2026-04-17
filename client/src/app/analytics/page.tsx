"use client";

import React from "react";
import { 
  BarChart, 
  TrendingUp, 
  PieChart, 
  Target, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Performance Analytics</h2>
          <p className="text-slate-500 font-medium mt-1">Real-time insights into your admission funnel and counsellor efficiency.</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 focus:outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Conversions" 
          value="124" 
          trend="+12%" 
          trendType="up" 
          icon={Target} 
          color="bg-blue-600" 
        />
        <StatsCard 
          label="Avg. Handling Time" 
          value="14m" 
          trend="-8%" 
          trendType="up" 
          icon={Clock} 
          color="bg-indigo-600" 
        />
        <StatsCard 
          label="Counsellor Perf." 
          value="88%" 
          trend="+4%" 
          trendType="up" 
          icon={Users} 
          color="bg-emerald-600" 
        />
        <StatsCard 
          label="Lead Velocity" 
          value="4.2/day" 
          trend="-2%" 
          trendType="down" 
          icon={TrendingUp} 
          color="bg-purple-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Enrollment Funnel</h3>
            <BarChart className="w-5 h-5 text-slate-400" />
          </div>
          
          <div className="space-y-6">
            <FunnelStep label="New Leads" value={450} total={450} color="bg-blue-500" />
            <FunnelStep label="Contacted" value={320} total={450} color="bg-indigo-500" />
            <FunnelStep label="Followed Up" value={180} total={450} color="bg-purple-500" />
            <FunnelStep label="Applied" value={95} total={450} color="bg-pink-500" />
            <FunnelStep label="Admitted" value={42} total={450} color="bg-emerald-500" />
          </div>
        </div>

        {/* Source Distribution */}
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Lead Sources</h3>
            <PieChart className="w-5 h-5 text-slate-400" />
          </div>

          <div className="flex flex-col gap-5 mt-4">
            <SourceItem label="Facebook Ads" percent={45} count={202} color="bg-blue-500" />
            <SourceItem label="Google Search" percent={25} count={112} color="bg-emerald-500" />
            <SourceItem label="Direct Walk-in" percent={15} count={68} color="bg-amber-500" />
            <SourceItem label="Instagram" percent={10} count={45} color="bg-pink-500" />
            <SourceItem label="Other" percent={5} count={23} color="bg-slate-400" />
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recommendation</p>
            <p className="text-sm font-medium text-slate-700">Facebook Ads ROI is at an all-time high. Consider shifting 15% budget from other sources.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FunnelStep({ label, value, total, color }: { label: string, value: number, total: number, color: string }) {
  const percentage = (value / total) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end text-sm">
        <span className="font-bold text-slate-700">{label}</span>
        <span className="font-bold text-slate-900">{value} <span className="text-slate-400 font-medium ml-1">({Math.round(percentage)}%)</span></span>
      </div>
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}

function SourceItem({ label, percent, count, color }: { label: string, percent: number, count: number, color: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <div className="flex-1">
        <div className="flex justify-between text-sm font-bold">
          <span className="text-slate-700">{label}</span>
          <span className="text-slate-900">{percent}%</span>
        </div>
        <p className="text-xs text-slate-400 font-medium">{count} leads generated</p>
      </div>
    </div>
  );
}
