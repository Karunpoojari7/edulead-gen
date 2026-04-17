"use client";

import React, { useState } from "react";
import { 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOutgoing, 
  Search, 
  Clock, 
  Calendar,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CallActionMenu } from "@/components/CallActionMenu";
import { motion, AnimatePresence } from "framer-motion";

const CALL_LOGS = [
  { id: 1, name: "Rahul Sharma", type: "OUTGOING", status: "CONNECTED", duration: "4m 20s", time: "10:30 AM", date: "Today" },
  { id: 2, name: "Sneha Kapoor", type: "INCOMING", status: "CONNECTED", duration: "12m 45s", time: "09:15 AM", date: "Today" },
  { id: 3, name: "Amit Verma", type: "OUTGOING", status: "MISSED", duration: "0s", time: "11:00 PM", date: "Yesterday" },
  { id: 4, name: "Priya Das", type: "OUTGOING", status: "CONNECTED", duration: "1m 15s", time: "04:30 PM", date: "Yesterday" },
  { id: 5, name: "Vikram Singh", type: "INCOMING", status: "CONNECTED", duration: "8m 10s", time: "02:15 PM", date: "Yesterday" },
];

export default function CallReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Streams");

  const filteredLogs = CALL_LOGS.filter(log => {
    const matchesSearch = log.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Streams" || 
                         (statusFilter === "Outgoing" && log.type === "OUTGOING") ||
                         (statusFilter === "Incoming" && log.type === "INCOMING") ||
                         (statusFilter === "Missed" && log.status === "MISSED");
    return matchesSearch && matchesStatus;
  });

  const handleStartDialer = () => {
    alert("System initializing Power Dialer protocol...");
  };

  const handlePlayRecording = (name: string) => {
    alert(`Streaming decrypted audio archive for: ${name}`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Interaction Metrics</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em] bg-white/5 py-1 px-3 rounded-lg inline-block text-accent">Voice Intelligence logs</p>
        </div>
        <button 
          onClick={handleStartDialer}
          className="flex items-center gap-2 px-6 py-3 btn-primary-lime text-sm shadow-xl w-full md:w-auto justify-center"
        >
          <PhoneCall className="w-5 h-5" /> Start Power Dialer
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 p-5 bg-white/[0.03] rounded-[32px] border border-white/5 shadow-none">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Filter by contact or voice hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 font-bold text-sm text-white placeholder-slate-700 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 lg:w-48 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] text-slate-400 uppercase tracking-widest cursor-pointer focus:outline-none hover:bg-white/10 transition-all appearance-none text-center"
          >
            <option className="bg-[#0a0a0a]">All Streams</option>
            <option className="bg-[#0a0a0a]">Outgoing</option>
            <option className="bg-[#0a0a0a]">Incoming</option>
            <option className="bg-[#0a0a0a]">Missed</option>
          </select>
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
            <Calendar className="w-4 h-4" /> Period
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-card rounded-[32px] overflow-hidden border-none bg-white/[0.02] shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-white/[0.01] text-left border-b border-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Contact Node</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Flow Direction</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Duration</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Timestamp</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Archives</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredLogs.map((log) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={log.id} 
                    className="group hover:bg-white/5 transition-all cursor-pointer border-none"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center font-black text-slate-400 text-xs border border-white/5 group-hover:border-accent/20 transition-all">
                          {log.name.charAt(0)}
                        </div>
                        <span className="font-bold text-white tracking-tight group-hover:text-accent transition-colors">{log.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 font-black text-[10px] text-slate-500 uppercase tracking-widest">
                        {log.type === 'OUTGOING' ? (
                          <><PhoneOutgoing className="w-4 h-4 text-accent" /> Outgoing</>
                        ) : (
                          <><PhoneIncoming className="w-4 h-4 text-accent" /> Incoming</>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                        log.status === 'CONNECTED' ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      )}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[11px] font-black text-slate-400 tabular-nums uppercase tracking-tight">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> {log.duration}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {log.date} <span className="text-slate-700 ml-1">/ {log.time}</span>
                    </td>
                    <td className="px-8 py-6">
                      {log.status === 'CONNECTED' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayRecording(log.name);
                          }}
                          className="p-2 bg-accent/20 text-accent rounded-xl hover:bg-accent hover:text-black transition-all border border-accent/20"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <CallActionMenu 
                        onPlay={() => handlePlayRecording(log.name)}
                        onDownload={() => alert(`Exporting decrypted payload for: ${log.name}`)}
                        onTranscript={() => alert(`Generating AI intelligence transcript...`)}
                        onViewLead={() => alert(`Redirecting to target node intelligence: ${log.name}`)}
                        onFlag={() => alert(`Flagging segment ${log.id} for manual audit.`)}
                        onDelete={() => alert(`Initiating secure purge of record ${log.id}`)}
                      />
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
