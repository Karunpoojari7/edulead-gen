"use client";

import React, { useState, useEffect } from "react";
import { 
  Cpu, 
  Activity, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Play, 
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

type AutomationTask = {
  id: number;
  leadId: number;
  actionType: string;
  scheduledTime: string;
  status: string;
  createdAt: string;
};

export default function AutomationPage() {
  const [tasks, setTasks] = useState<AutomationTask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8082/api/automation/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch automation tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Automation Engine</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-widest bg-white/5 py-1 px-3 rounded-lg inline-block text-accent">Real-time Task Pulse</p>
        </div>
        <button 
          onClick={fetchTasks}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-bold text-slate-400 hover:text-white transition-all text-sm"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsTile label="Total Tasks" value={tasks.length} icon={Cpu} color="text-accent" bg="bg-white/5" />
        <StatsTile label="Executed" value={tasks.filter(t => t.status === 'DONE').length} icon={CheckCircle2} color="text-emerald-500" bg="bg-white/5" />
        <StatsTile label="Pending" value={tasks.filter(t => t.status === 'PENDING').length} icon={Clock} color="text-amber-500" bg="bg-white/5" />
      </div>

      <div className="glass-card rounded-[32px] overflow-hidden border-none shadow-none">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" /> Live Task Queue
          </h3>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Auto-refreshing every 10s</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/[0.01] text-left">
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Task ID</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Lead Reference</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Action Type</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Execution Time</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Live Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white/[0.01]">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <Cpu className="w-16 h-16 text-white/5 mx-auto mb-6" />
                    <p className="text-slate-400 font-black text-xl">Queue is currently idle.</p>
                    <p className="text-slate-600 text-sm mt-1">Add a new lead to kickstart the automation engine.</p>
                  </td>
                </tr>
              ) : (
                [...tasks].reverse().map((task) => (
                  <tr key={task.id} className="hover:bg-white/5 transition-all group border-none">
                    <td className="px-8 py-6">
                      <span className="font-mono text-sm font-black text-slate-600 group-hover:text-accent transition-colors">#{task.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(158,229,40,0.5)]" />
                        <span className="font-bold text-white">Lead #{task.leadId}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest",
                        task.actionType === 'EMAIL' ? 'bg-indigo-500/10 text-indigo-400' :
                        task.actionType === 'SMS' ? 'bg-amber-500/10 text-amber-400' :
                        task.actionType === 'WHATSAPP' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400'
                      )}>
                        {task.actionType}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-300">{new Date(task.scheduledTime).toLocaleDateString()}</span>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{new Date(task.scheduledTime).toLocaleTimeString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {task.status === 'DONE' ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          </div>
                        ) : task.status === 'PENDING' ? (
                          <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        )}
                        <span className={cn(
                          "text-xs font-black uppercase tracking-widest",
                          task.status === 'DONE' ? 'text-emerald-500' :
                          task.status === 'PENDING' ? 'text-accent' : 'text-rose-500'
                        )}>
                          {task.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatsTile({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className="glass-card p-6 rounded-[32px] flex items-center gap-5 border-none bg-white/[0.03] shadow-none">
      <div className={cn("w-14 h-14 rounded-[20px] flex items-center justify-center shadow-inner", bg)}>
        <Icon className={cn("w-7 h-7", color)} />
      </div>
      <div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{label}</p>
        <h3 className="text-3xl font-black text-white tabular-nums tracking-tighter">{value}</h3>
      </div>
    </div>

  );
}
