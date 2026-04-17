"use client";

import React from "react";
import { 
  UserPlus, 
  Shield, 
  Mail, 
  MoreVertical, 
  Activity,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

import { USERS } from "@/lib/mockData"; // Moving data to a mock file for clarity if possible, but I'll stick to local for now
import { UserActionMenu } from "@/components/UserActionMenu";
import { motion, AnimatePresence } from "framer-motion";

const USERS_DATA = [
  { id: 1, name: "Admin Lead", email: "admin@edulead.com", role: "ADMIN", status: "ACTIVE", leads: 450, lastActive: "Just now" },
  { id: 2, name: "Karan Singh", email: "karan.s@edulead.com", role: "COUNSELLOR", status: "ACTIVE", leads: 124, lastActive: "15 mins ago" },
  { id: 3, name: "Neha Prajapati", email: "neha.p@edulead.com", role: "COUNSELLOR", status: "OFFLINE", leads: 89, lastActive: "2 hours ago" },
  { id: 4, name: "Rohit Kumar", email: "rohit.k@edulead.com", role: "MARKETING", status: "ACTIVE", leads: 212, lastActive: "5 mins ago" },
];

export default function UsersPage() {
  const handleAddMember = () => {
    alert("System initializing Recruitment Node... Opening Personnel Intake Portal.");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Access Control</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-widest bg-white/5 py-1 px-3 rounded-lg inline-block text-accent">Personnel Hierarchy</p>
        </div>
        <button 
          onClick={handleAddMember}
          className="flex items-center gap-2 px-6 py-3 btn-primary-lime text-sm shadow-xl"
        >
          <UserPlus className="w-5 h-5" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-[32px] flex flex-col gap-4 border-none bg-white/[0.03] shadow-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Command</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-white tracking-tighter">12</h3>
              <span className="text-accent text-[10px] font-black uppercase tracking-widest">+2 Active</span>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-[32px] flex flex-col gap-4 border-none bg-white/[0.03] shadow-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Active Roles</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-white tracking-tighter">03</h3>
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">RBAC ACTIVE</span>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-[32px] flex flex-col gap-4 border-none bg-white/[0.03] shadow-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
            <Activity className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Counsellor Load</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-white tracking-tighter">92%</h3>
              <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden mb-2 shadow-inner">
                <div className="h-full bg-accent w-[92%] shadow-[0_0_15px_#9EE528]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="glass-card rounded-[32px] overflow-hidden border-none bg-white/[0.02] shadow-none">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.01] text-left border-b border-white/5">
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Personnel Details</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Authority</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Unit Load</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Pulse State</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Last Sync</th>
              <th className="px-8 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-white/[0.01]">
            <AnimatePresence>
              {USERS_DATA.map((user) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={user.id} 
                  className="group hover:bg-white/5 transition-all cursor-pointer border-none"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center font-black text-slate-400 text-xs shadow-inner">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white tracking-tight group-hover:text-accent transition-colors">{user.name}</p>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "text-[9px] font-black tracking-[0.2em] px-2 py-1 rounded-md uppercase",
                      user.role === 'ADMIN' ? 'bg-accent text-black' :
                      user.role === 'COUNSELLOR' ? 'bg-white/5 text-slate-400 border border-white/5' : 'bg-white/5 text-slate-500'
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-black text-white tabular-nums text-sm group-hover:text-accent transition-colors">{user.leads}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        user.status === 'ACTIVE' ? 'bg-accent shadow-[0_0_10px_#9EE528]' : 'bg-slate-700'
                      )} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">{user.lastActive}</td>
                  <td className="px-8 py-6 text-right">
                    <UserActionMenu 
                      onEditAuthority={() => alert(`Accessing authority matrix for: ${user.name}`)}
                      onAllocateUnit={() => alert(`Adjusting load parameters for node: ${user.id}`)}
                      onViewActivity={() => alert(`Decrypting personnel activity logs...`)}
                      onToggleStatus={() => alert(`Initiating temporal suspension for: ${user.name}`)}
                      onDelete={() => {
                        if(confirm(`Revoke all access for ${user.name}? This action is permanent.`)) {
                          alert(`Access keys revoked for personnel node: ${user.id}`);
                        }
                      }}
                    />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
