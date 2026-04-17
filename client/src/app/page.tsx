"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Flame, 
  Target, 
  PhoneForwarded, 
  Search, 
  ChevronRight,
  Plus,
  Cpu,
  Download
} from "lucide-react";

import { StatsCard } from "@/components/StatsCard";
import { useLeads } from "@/hooks/useLeads";
import { cn } from "@/lib/utils";
import { AddLeadModal } from "@/components/AddLeadModal";
import { LeadActionMenu } from "@/components/LeadActionMenu";

export default function Dashboard() {
  const { leads, addLead, deleteLead } = useLeads();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recentLeads = leads.slice(0, 5).filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <AddLeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addLead} 
      />
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 mt-1 font-medium bg-white/5 py-1 px-3 rounded-lg inline-block text-xs uppercase tracking-widest text-accent">System Intelligence Operational</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium text-sm w-64 text-white"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 btn-primary-lime text-sm shadow-xl"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Leads" 
          value={leads.length.toString()} 
          trend="+12.5%" 
          trendType="up" 
          icon={Users} 
          color="bg-blue-600" 
        />
        <StatsCard 
          label="Hot Leads" 
          value={leads.filter(l => l.tag === 'HOT').length.toString()} 
          trend="+8.2%" 
          trendType="up" 
          icon={Flame} 
          color="bg-red-500" 
        />
        <StatsCard 
          label="Admissions" 
          value="64" 
          trend="+2.4%" 
          trendType="up" 
          icon={Target} 
          color="bg-emerald-500" 
        />
        <StatsCard 
          label="Active Calls" 
          value="156" 
          trend="-3.1%" 
          trendType="down" 
          icon={PhoneForwarded} 
          color="bg-purple-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-[32px] overflow-hidden border-none bg-white/[0.03] shadow-none">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-lg font-black text-white tracking-tight uppercase text-sm tracking-[0.2em]">Recent Pulse</h3>
            <Link href="/leads" className="text-xs font-black text-accent hover:opacity-70 flex items-center gap-1 transition-all uppercase tracking-widest">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.01] text-left">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Lead Info</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Source</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Priority</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-all cursor-pointer group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-white tracking-tight">{lead.name}</span>
                        <span className="text-xs text-slate-500 font-medium">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-400">{lead.source}</td>
                    <td className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest">{lead.status}</td>
                    <td className="px-8 py-6">
                      <span className={cn("status-badge", 
                        lead.tag === 'HOT' ? 'status-hot' : lead.tag === 'WARM' ? 'status-warm' : 'status-cold'
                      )}>
                        {lead.tag}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <LeadActionMenu 
                        onEdit={() => alert(`Editing lead: ${lead.name}`)}
                        onView={() => alert(`Viewing lead intelligence for: ${lead.name}`)}
                        onAssign={() => alert(`Assigning lead: ${lead.name} to agent...`)}
                        onDelete={() => {
                          if(confirm(`Are you sure you want to purge ${lead.name}'s record?`)) {
                            deleteLead(lead.id);
                          }
                        }}
                        onCall={() => alert(`Initiating secure call to: ${lead.phone || lead.email}`)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 rounded-[32px] border-none bg-white/[0.03] shadow-none">
            <h3 className="text-xs font-black text-slate-500 mb-8 uppercase tracking-[0.2em]">Command Center</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <Link href="/leads" className="p-5 bg-white/[0.02] rounded-[24px] hover:bg-accent transition-all group border border-white/5 hover:border-transparent">
                <Users className="w-8 h-8 mx-auto mb-3 text-slate-600 group-hover:text-black" />
                <span className="text-[10px] font-black text-slate-500 group-hover:text-black uppercase tracking-widest">Leads</span>
              </Link>
              <Link href="/follow-ups" className="p-5 bg-white/[0.02] rounded-[24px] hover:bg-accent transition-all group border border-white/5 hover:border-transparent">
                <Target className="w-8 h-8 mx-auto mb-3 text-slate-600 group-hover:text-black" />
                <span className="text-[10px] font-black text-slate-500 group-hover:text-black uppercase tracking-widest">Tasks</span>
              </Link>
              <Link href="/automation" className="p-5 bg-white/[0.02] rounded-[24px] hover:bg-accent transition-all group border border-white/5 hover:border-transparent">
                <Cpu className="w-8 h-8 mx-auto mb-3 text-slate-600 group-hover:text-black" />
                <span className="text-[10px] font-black text-slate-500 group-hover:text-black uppercase tracking-widest">Engine</span>
              </Link>
              <button 
                onClick={() => alert('Opening export settings...')}
                className="p-5 bg-white/[0.02] rounded-[24px] hover:bg-accent transition-all group border border-white/5 hover:border-transparent flex flex-col items-center"
              >
                <Download className="w-8 h-8 mb-3 text-slate-600 group-hover:text-black" />
                <span className="text-[10px] font-black text-slate-500 group-hover:text-black uppercase tracking-widest">Reports</span>
              </button>
            </div>
          </div>

          <div className="btn-primary-lime p-8 rounded-[32px] text-black shadow-2xl relative overflow-hidden group border-none">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-2 tracking-tighter">System Output</h3>
              <p className="text-black/70 text-sm mb-6 leading-relaxed font-bold">Your engagement score is at an all-time high this quarter.</p>
              <Link href="/analytics" className="bg-black text-white px-6 py-3 rounded-2xl text-xs font-black hover:opacity-80 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                Deep Audit <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <Flame className="w-32 h-32 absolute -right-8 -bottom-8 text-black/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>

      </div>
    </div>
  );
}


