"use client";

import React, { useState } from "react";
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Database, 
  Smartphone,
  Save,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "system", label: "System Config", icon: Database },
  ];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Core Config</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-widest bg-white/5 py-1 px-3 rounded-lg inline-block text-accent">Terminal Parameters</p>
        </div>
        <button 
          onClick={handleSave}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl border-none",
            saved ? "bg-emerald-500 text-black shadow-emerald-500/20" : "btn-primary-lime"
          )}
        >
          {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saved ? "Config Updated" : "Commit Changes"}
        </button>
      </div>

      <div className="flex gap-10">
        {/* Sidebar Tabs */}
        <div className="w-72 space-y-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all border border-transparent",
                  activeTab === tab.id 
                    ? "bg-accent text-black shadow-xl" 
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-400"
                )}
              >
                <Icon className={cn("w-5 h-5", activeTab === tab.id ? "text-black" : "text-slate-600")} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 glass-card rounded-[32px] p-10 border-none bg-white/[0.03] shadow-none">
          {activeTab === 'profile' && (
            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Identify Protocol
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Personnel Alias</label>
                    <input type="text" defaultValue="Admin Lead" className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Stream Address</label>
                    <input type="email" defaultValue="admin@edulead.com" className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Assigned Designation</label>
                    <input type="text" defaultValue="Systems Administrator" className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Comms Hash</label>
                    <input type="text" defaultValue="+91 98765 43210" className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-inner" />
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-slate-700" /> Interface Parameters
                </h3>
                <div className="space-y-6">
                  <SettingToggle label="Emerald Night" description="Experience the UI in a tactical low-light environment." checked={true} />
                  <SettingToggle label="Neural Compact" description="Show more leads per page by optimizing lattice padding." checked={true} />
                  <SettingToggle label="Automation Loop" description="Automatically distribute incoming lead streams." checked={true} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Signal Alerts
                </h3>
                <div className="space-y-6">
                  <SettingToggle label="Email Synchronization" description="Receive lead intelligence reports via secure SMTP." checked={true} />
                  <SettingToggle label="SMS Gateway" description="Pulse alerts for immediate high-priority lead activity." checked={false} />
                  <SettingToggle label="Browser Pushes" description="Real-time terminal notifications for status changes." checked={true} />
                </div>
              </div>
              <div className="pt-10 border-t border-white/5">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8">Alert Thresholds</h3>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Min. Lead Score for Alert</label>
                  <input type="range" min="0" max="100" defaultValue="70" className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-accent" />
                  <div className="flex justify-between text-[10px] font-black text-slate-600">
                    <span>COLD</span>
                    <span>WARM (70%)</span>
                    <span>HOT</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]" /> Bio-Metric Factor
                </h3>
                <div className="space-y-6">
                  <SettingToggle label="Two-Factor Auth" description="Secure terminal access with neural TOTP tokens." checked={true} />
                  <SettingToggle label="Session Persistence" description="Keep personnel logged in through temporal shifts." checked={false} />
                  <SettingToggle label="IP Whitelisting" description="Restrict access to verified subnet addresses." checked={true} />
                </div>
              </div>
              <div className="pt-10 border-t border-white/5">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8">Identity Rotation</h3>
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:bg-white/10 hover:text-white transition-all shadow-xl">
                  Initiate Password Re-Hash
                </button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" /> External Streams
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <IntegrationCard name="Facebook Ads" status="CONNECTED" icon={<Globe className="w-5 h-5" />} />
                  <IntegrationCard name="WhatsApp Bridge" status="ACTIVE" icon={<Smartphone className="w-5 h-5" />} />
                  <IntegrationCard name="Instagram Flux" status="OFFLINE" icon={<Globe className="w-5 h-5 text-rose-500" />} />
                  <IntegrationCard name="Google Pulse" status="CONNECTED" icon={<Database className="w-5 h-5 text-amber-500" />} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-amber-500" /> Database Dynamics
                </h3>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Lead Retention Cycle (Days)</label>
                    <input type="number" defaultValue="30" className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Auto-Purge Threshold (Score)</label>
                    <input type="number" defaultValue="10" className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-inner" />
                  </div>
                </div>
              </div>
              <div className="pt-10 border-t border-white/5">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-rose-500" /> Hard Purge
                </h3>
                <button className="w-full py-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-xl">
                  Initiate Factory Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ name, status, icon }: { name: string, status: string, icon: React.ReactNode }) {
  return (
    <div className="p-6 bg-white/5 border border-white/5 rounded-[24px] hover:border-accent/30 transition-all group flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-accent transition-all shadow-inner">
          {icon}
        </div>
        <span className={cn(
          "text-[8px] font-black tracking-widest px-2 py-0.5 rounded-md",
          status === 'CONNECTED' ? 'bg-emerald-500/10 text-emerald-500' :
          status === 'ACTIVE' ? 'bg-accent/10 text-accent' :
          'bg-rose-500/10 text-rose-500'
        )}>
          {status}
        </span>
      </div>
      <div>
        <p className="font-bold text-white text-xs">{name}</p>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">External Data Stream</p>
      </div>
    </div>
  );
}

function SettingToggle({ label, description, checked }: { label: string, description: string, checked: boolean }) {
  const [isOn, setIsOn] = useState(checked);
  return (
    <div className="flex justify-between items-center group">
      <div>
        <p className="font-bold text-white text-sm">{label}</p>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{description}</p>
      </div>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={cn(
          "w-12 h-6 rounded-full p-1 transition-all relative overflow-hidden",
          isOn ? "bg-accent shadow-[0_0_15px_rgba(158,229,40,0.3)]" : "bg-white/10"
        )}
      >
        <div className={cn(
          "w-4 h-4 rounded-full transition-all flex items-center justify-center shadow-lg",
          isOn ? "translate-x-6 bg-black" : "translate-x-0 bg-slate-600"
        )} />
      </button>
    </div>

  );
}
