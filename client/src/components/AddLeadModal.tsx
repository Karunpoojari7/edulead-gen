"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (lead: any) => void;
}

export function AddLeadModal({ isOpen, onClose, onAdd }: AddLeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Direct",
    tag: "WARM" as const,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, status: "NEW" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass-card w-full max-w-md bg-[#16171A] rounded-[32px] p-10 border-none shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tighter">Add New Lead</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Manual Pulse Entry</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold text-white placeholder-slate-700"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold text-white placeholder-slate-700"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
            <input 
              required
              type="tel" 
              className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold text-white placeholder-slate-700"
              placeholder="+91 00000 00000"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Source</label>
              <select 
                className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-black text-white cursor-pointer"
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
              >
                <option className="bg-[#16171A]">Direct</option>
                <option className="bg-[#16171A]">Facebook Ads</option>
                <option className="bg-[#16171A]">Google Search</option>
                <option className="bg-[#16171A]">Website</option>
                <option className="bg-[#16171A]">Instagram</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Priority</label>
              <select 
                className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-black text-white cursor-pointer"
                value={formData.tag}
                onChange={(e) => setFormData({...formData, tag: e.target.value as any})}
              >
                <option value="HOT" className="bg-[#16171A]">Hot 🔥</option>
                <option value="WARM" className="bg-[#16171A]">Warm ☀️</option>
                <option value="COLD" className="bg-[#16171A]">Cold ❄️</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 py-5 btn-primary-lime text-sm uppercase tracking-[0.2em] shadow-2xl"
          >
            Deploy Lead
          </button>
        </form>
      </div>

    </div>
  );
}
