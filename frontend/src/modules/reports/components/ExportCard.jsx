import React from 'react';
import { FileText, Download, Printer, Share2, Award, ShieldCheck } from 'lucide-react';

const ExportCard = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-50 pb-2.5">
        <FileText className="h-4.5 w-4.5 text-indigo-600" />
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Reports Export Center</h3>
      </div>

      <div className="grid grid-cols-1 gap-3 text-xs">
        
        {/* PDF Card */}
        <div 
          onClick={() => alert('Compiling document templates for PDF download...')}
          className="p-3 bg-slate-50 hover:bg-indigo-50/30 border border-slate-200/60 rounded-xl flex items-center justify-between cursor-pointer group transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg group-hover:scale-105 transition-transform">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-800 block">Export Executive Summary (PDF)</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase block mt-0.5">Calculated charts report</span>
            </div>
          </div>
          <Download className="h-4 w-4 text-slate-450" />
        </div>

        {/* CSV Card */}
        <div 
          onClick={() => alert('Exporting all logs as structured CSV columns...')}
          className="p-3 bg-slate-50 hover:bg-indigo-50/30 border border-slate-200/60 rounded-xl flex items-center justify-between cursor-pointer group transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-105 transition-transform">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-800 block">Export Full Ledger (CSV)</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase block mt-0.5">Standard delimiter separated file</span>
            </div>
          </div>
          <Download className="h-4 w-4 text-slate-450" />
        </div>

        {/* Print card */}
        <div 
          onClick={() => window.print()}
          className="p-3 bg-slate-50 hover:bg-indigo-50/30 border border-slate-200/60 rounded-xl flex items-center justify-between cursor-pointer group transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-105 transition-transform">
              <Printer className="h-4 w-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-800 block">Print Executive Report</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase block mt-0.5">A4 portrait layout presets</span>
            </div>
          </div>
          <Printer className="h-4 w-4 text-slate-450" />
        </div>

        {/* Share card */}
        <div 
          onClick={() => alert('Report sharing link generated and copied to clipboard!')}
          className="p-3 bg-slate-50 hover:bg-indigo-50/30 border border-slate-200/60 rounded-xl flex items-center justify-between cursor-pointer group transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-105 transition-transform">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-800 block">Share Analytics Dashboard</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase block mt-0.5">Generate secure sharing token</span>
            </div>
          </div>
          <Share2 className="h-4 w-4 text-slate-450" />
        </div>

      </div>

      <div className="p-3.5 bg-indigo-900 rounded-xl text-white text-[11px] leading-relaxed flex items-start gap-2 shadow shadow-indigo-900/10">
        <ShieldCheck className="h-4 w-4 text-indigo-300 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Enterprise Access Sign-Off</span>
          <p className="text-[10px] text-indigo-200 mt-0.5">Exporting executive summaries triggers a security record trace log inside the administrative audit registry.</p>
        </div>
      </div>

    </div>
  );
};

export default ExportCard;
