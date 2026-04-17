"use client";

import { 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ChevronRight,
  MoreHorizontal,
  Workflow,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFollowUps, FollowUp } from "@/hooks/useFollowUps";
import { TaskActionMenu } from "@/components/TaskActionMenu";
import { motion, AnimatePresence } from "framer-motion";

export default function FollowUpsPage() {
  const { followUps, loading, completeFollowUp, deleteFollowUp } = useFollowUps();

  if (loading) return <div className="p-10 text-center font-black text-slate-500 uppercase tracking-widest animate-pulse">Syncing Task Nodes...</div>;
  
  const todayTasks = followUps.filter(f => f.status === 'PENDING' || f.status === 'UPCOMING');
  
  // Create mock upcoming tasks if empty to fill "Scheduled Latency" as requested by user
  const mockUpcomingTasks: Partial<FollowUp>[] = todayTasks.length < 3 ? [
    { id: -1, lead: { id: 101, name: "Priya Das" }, task: "Verify Admission Documents", dueDate: "2026-04-18T10:00:00Z", priority: 'LOW', status: 'UPCOMING' },
    { id: -2, lead: { id: 102, name: "Vikram Singh" }, task: "Final Fee Negotiation", dueDate: "2026-04-19T14:30:00Z", priority: 'MEDIUM', status: 'UPCOMING' }
  ] : [];

  const handleNewTask = () => {
    alert("Opening Universal Task Entry Node...");
  };

  const handleLaunchTimeline = () => {
    alert("Initializing Temporal Interaction Timeline... Generating visual engagement map.");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Active Engagements</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-widest bg-white/5 py-1 px-3 rounded-lg inline-block text-accent">Lead Latency Monitoring</p>
        </div>
        <button 
          onClick={handleNewTask}
          className="flex items-center gap-2 px-6 py-3 btn-primary-lime text-sm shadow-xl"
        >
          <Plus className="w-5 h-5" /> New Task Node
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-4 text-slate-500 font-black mb-8">
            <span className="bg-white/5 px-4 py-2 rounded-xl text-[10px] uppercase tracking-[0.2em] text-accent flex items-center gap-2">
              <Zap className="w-3 h-3" /> Immediate Pulse
            </span>
            <div className="h-[2px] flex-1 bg-white/5" />
          </div>

          <div className="space-y-4">
            {todayTasks.length === 0 ? (
              <div className="py-20 text-center glass-card rounded-[32px] border-none bg-white/[0.02]">
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4 opacity-50" />
                <p className="text-slate-500 font-black uppercase tracking-widest text-xs">All lead nodes synchronized.</p>
              </div>
            ) : (
              todayTasks.map((item) => (
                <TaskCard 
                  key={item.id} 
                  {...item} 
                  onComplete={() => completeFollowUp(item.id)}
                  onDelete={() => {
                    if(confirm("Purge this task node?")) deleteFollowUp(item.id);
                  }}
                  name={item.lead?.name || 'Unknown'} 
                  dueDate={new Date(item.dueDate).toLocaleString()} 
                />
              ))
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-black mb-8 mt-12">
            <span className="bg-white/5 px-4 py-2 rounded-xl text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <Clock className="w-3 h-3" /> Scheduled Latency
            </span>
            <div className="h-[2px] flex-1 bg-white/5" />
          </div>

          <div className="space-y-4">
            {mockUpcomingTasks.map((item) => (
              <TaskCard 
                key={item.id} 
                priority={item.priority}
                task={item.task}
                name={item.lead?.name || 'Unknown'} 
                dueDate={new Date(item.dueDate!).toLocaleString()} 
                isMock={true}
              />
            ))}
          </div>

        </div>

        <div className="space-y-8">
          <div className="glass-card rounded-[32px] p-8 btn-primary-lime text-black shadow-2xl relative overflow-hidden group border-none">
            <h3 className="font-black text-xl mb-2 tracking-tighter uppercase text-sm tracking-[0.1em]">Schedule Flow</h3>
            <p className="text-black/70 text-sm font-bold mb-8 leading-relaxed">System tracking {todayTasks.length + 2} engagements in active synchronization.</p>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center bg-black/10 p-4 rounded-[20px] border border-black/5">
                <span className="text-[10px] font-black uppercase tracking-widest">Pending Sync</span>
                <span className="bg-black text-white px-3 py-1 rounded-lg font-black text-xs">02</span>
              </div>
              <div className="flex justify-between items-center bg-black/10 p-4 rounded-[20px] border border-black/5">
                <span className="text-[10px] font-black uppercase tracking-widest">Avg Latency</span>
                <span className="text-xs font-black">12m</span>
              </div>
            </div>
            <button 
              onClick={handleLaunchTimeline}
              className="w-full mt-8 py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-80 transition-all shadow-xl"
            >
              Launch Timeline
            </button>
            <Clock className="w-32 h-32 absolute -right-8 -bottom-8 text-black/5 group-hover:scale-110 transition-all duration-500" />
          </div>

          <div className="glass-card rounded-[32px] p-8 border-none bg-white/[0.03] shadow-none">
            <h3 className="font-black text-slate-600 mb-8 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
              <Workflow className="w-3 h-3" /> Intelligence Data
            </h3>
            <div className="space-y-6">
              <StatRow label="Nodes Closed" value="48" color="text-emerald-500" />
              <StatRow label="Missed Signals" value="03" color="text-rose-500" />
              <StatRow label="Escalation Risk" value="12" color="text-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ name, task, dueDate, priority, onComplete, onDelete, isMock }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6 rounded-[28px] border-none bg-white/[0.03] hover:bg-white/[0.06] transition-all group cursor-pointer flex items-center gap-6 shadow-none"
    >
      <div className={cn(
        "w-1.5 h-12 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]",
        priority === 'HIGH' ? 'bg-rose-500 shadow-rose-500/20' :
        priority === 'MEDIUM' ? 'bg-amber-500 shadow-amber-500/20' : 'bg-slate-700'
      )} />
      
      <div className="flex-1">
        <h4 className="font-black text-white flex items-center gap-3 group-hover:text-accent transition-colors tracking-tight uppercase text-sm">
          {name}
          <span className={cn(
            "text-[9px] px-2 py-0.5 rounded-md font-black tracking-[0.2em] uppercase",
            priority === 'HIGH' ? 'bg-rose-500/10 text-rose-500' :
            priority === 'MEDIUM' ? 'bg-amber-500/10 text-amber-500' : 'bg-white/5 text-slate-500'
          )}>
            {priority}
          </span>
        </h4>
        <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tight">{task}</p>
      </div>

      <div className="flex items-center gap-4 text-right">
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black text-slate-600 flex items-center gap-1 uppercase tracking-widest mb-1">
            <Clock className="w-3 h-3" /> LATENCY LIMIT
          </span>
          <span className="text-[10px] font-black text-white tabular-nums tracking-tighter uppercase whitespace-nowrap">{dueDate}</span>
        </div>
        {!isMock ? (
          <TaskActionMenu 
            onComplete={onComplete}
            onReschedule={() => alert("Accessing temporal reassignment module...")}
            onAssign={() => alert("Routing task to counselor matrix...")}
            onTransfer={() => alert("Initializing node transfer protocol...")}
            onDelete={onDelete}
          />
        ) : (
          <div className="p-3 rounded-2xl bg-white/5 text-slate-800 cursor-not-allowed">
            <MoreHorizontal className="w-5 h-5 opacity-20" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StatRow({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      <span className={cn("font-black text-xl tabular-nums tracking-tighter", color)}>{value}</span>
    </div>
  );
}

