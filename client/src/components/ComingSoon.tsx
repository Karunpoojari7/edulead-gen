import React from "react";
import { Construction } from "lucide-react";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-slate-400 animate-fade-in">
      <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-slate-300" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title} Module</h2>
      <p className="max-w-md text-center font-medium">
        We're working hard to bring the {title.toLowerCase()} capabilities to EduLead CRM. Stay tuned for advanced analytics and reporting features.
      </p>
      <button className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
        Go Back to Dashboard
      </button>
    </div>
  );
}
