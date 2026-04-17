"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  MoreVertical, 
  Mail, 
  Phone 
} from "lucide-react";
import { useLeads, Lead } from "@/hooks/useLeads";
import { cn } from "@/lib/utils";
import { AddLeadModal } from "@/components/AddLeadModal";
import { LeadActionMenu } from "@/components/LeadActionMenu";

export default function LeadsPage() {
  const { leads, addLead, deleteLead } = useLeads();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === "ALL" || lead.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ["ID", "Name", "Email", "Phone", "Source", "Status", "Tag", "Date"];
    const csvRows = [
      headers.join(","),
      ...leads.map(lead => [
        lead.id,
        `"${lead.name}"`,
        lead.email,
        lead.phone,
        `"${lead.source}"`,
        lead.status,
        lead.tag,
        lead.date
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `EduLead_Leads_Report_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AddLeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addLead} 
      />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Lead Overview</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-widest bg-white/5 py-1 px-3 rounded-lg inline-block text-accent">Pipeline Intelligence</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportLeadsToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-bold text-slate-400 hover:text-white transition-all text-sm shadow-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 btn-primary-lime text-sm shadow-xl"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>

      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center bg-white/[0.03] p-5 rounded-[24px] border border-white/5 shadow-none">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold text-sm text-white w-80 placeholder-slate-600"
            />
          </div>
          <select 
            className="px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl focus:outline-none font-black text-xs text-slate-400 cursor-pointer uppercase tracking-widest"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="ALL" className="bg-[#16171A]">All Pulse Tags</option>
            <option value="HOT" className="bg-[#16171A]">Hot 🔥</option>
            <option value="WARM" className="bg-[#16171A]">Warm ☀️</option>
            <option value="COLD" className="bg-[#16171A]">Cold ❄️</option>
          </select>
        </div>
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          Syncing <span className="text-accent">{filteredLeads.length}</span> Results
        </div>
      </div>


      {/* Leads Table */}
      <div className="glass-card rounded-[32px] overflow-hidden min-h-[500px] border-none bg-white/[0.02] shadow-none">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.01] text-left border-b border-white/5">
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Contact Pulse</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Source</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Live Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Score</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Added</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Assigned To</th>
              <th className="px-8 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-white/[0.01]">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/5 transition-all cursor-pointer group border-none">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center font-black text-slate-400 text-xs shadow-inner">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white tracking-tight">{lead.name}</span>
                      <div className="flex gap-3 text-[10px] text-slate-500 font-black uppercase tracking-tight">
                        <span className="flex items-center gap-1 leading-none">{lead.email}</span>
                        <span className="flex items-center gap-1 leading-none text-slate-700">{lead.phone}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-slate-400">{lead.source}</td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "status-badge",
                    lead.status === 'NEW' ? 'bg-indigo-500/10 text-indigo-400' :
                    lead.status === 'CONTACTED' ? 'bg-sky-500/10 text-sky-400' :
                    'bg-emerald-500/10 text-emerald-400'
                  )}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                  <span className={cn("px-2 py-1 rounded-md", 
                    lead.tag === 'HOT' ? 'bg-rose-500/10 text-rose-500' :
                    lead.tag === 'WARM' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-blue-500/10 text-blue-500'
                  )}>
                    {lead.tag}
                  </span>
                </td>
                <td className="px-8 py-6 text-[11px] text-slate-500 font-black uppercase tracking-tight tabular-nums">{lead.date}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center text-[10px] font-black text-black">
                      {(lead as any).assignedTo?.name?.charAt(0) || '?'}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{(lead as any).assignedTo?.name || 'Unassigned'}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <LeadActionMenu 
                    onEdit={() => alert(`Editing lead: ${lead.name}`)}
                    onView={() => alert(`Viewing lead intelligence for: ${lead.name}`)}
                    onAssign={() => alert(`Assigning lead: ${lead.name}...`)}
                    onDelete={() => {
                      if(confirm(`Purge record for ${lead.name}?`)) {
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
        {filteredLeads.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Users className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-bold text-lg">No leads found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
