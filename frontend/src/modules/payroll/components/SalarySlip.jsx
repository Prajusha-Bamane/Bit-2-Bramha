import React from 'react';
import { ArrowLeft, Printer, Download, Sparkles } from 'lucide-react';

const SalarySlip = ({ record, onBack }) => {
  const employeeName = `${record.firstName} ${record.lastName}`;
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][record.month - 1];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* 1. Header controls */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 font-bold text-xs shadow-sm transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Ledger
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrint}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Print Slip
          </button>
          <button 
            onClick={() => alert('Download PDF successfully queued! (PDF wrapper generated).')}
            className="px-4 py-2 bg-primary text-white hover:bg-indigo-700 text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* 2. Main Payslip Sheet layout */}
      <div className="bg-white p-8 rounded-2xl border border-slate-250 shadow-sm space-y-6 text-slate-750 font-sans print:shadow-none print:border-none print:p-0 print:m-0" id="print-payslip">
        
        {/* Company Header Info */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-1.5">
              <div className="p-2 bg-slate-900 rounded-lg text-white font-extrabold text-xs">SA</div>
              <h2 className="text-sm font-black text-slate-905 uppercase tracking-wide">Enterprise HRMS Inc.</h2>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] leading-relaxed">
              102, Bengaluru Tech Park, Outer Ring Road, Bangalore, KA, India.
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Payslip Log</h3>
            <p className="text-xs text-slate-500 font-bold mt-1">Month: {monthName} {record.year}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100/50">
              Payment Status: {record.status}
            </span>
          </div>
        </div>

        {/* Employee Info Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-slate-50/50 border border-slate-100 p-4 rounded-xl">
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Employee Name</span>
            <span className="font-extrabold text-slate-800 mt-0.5 block">{employeeName}</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Employee ID</span>
            <span className="font-extrabold text-slate-500 mt-0.5 block">{record.employeeId}</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Department</span>
            <span className="font-extrabold text-slate-500 mt-0.5 block">{record.department}</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Designation</span>
            <span className="font-extrabold text-slate-500 mt-0.5 block">{record.designation}</span>
          </div>
        </div>

        {/* Allowances vs Deductions Split Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* Allowances side */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden flex flex-col justify-between">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200">
              <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Earnings (Allowances)</h4>
            </div>
            
            <div className="p-4 space-y-2.5 flex-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Basic Salary</span>
                <span className="font-bold text-slate-700">₹{record.basicSalary.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">House Rent Allowance (HRA)</span>
                <span className="font-bold text-slate-705">₹{record.hra.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Medical Allowance</span>
                <span className="font-bold text-slate-705">₹{record.medical.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travel Allowance</span>
                <span className="font-bold text-slate-705">₹{record.travel.toLocaleString('en-IN')}</span>
              </div>
              {record.bonus > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Performance Bonus</span>
                  <span className="font-black">₹{record.bonus.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-50/50 px-4 py-2.5 border-t border-slate-100 flex justify-between font-bold text-slate-800">
              <span>Gross Earnings</span>
              <span>₹{(record.basicSalary + record.allowances + record.bonus).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Deductions side */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden flex flex-col justify-between">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200">
              <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Deductions</h4>
            </div>
            
            <div className="p-4 space-y-2.5 flex-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Provident Fund (PF)</span>
                <span className="font-bold text-slate-705">₹{record.pf.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Professional Tax (PT)</span>
                <span className="font-bold text-slate-705">₹{record.professionalTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Income Tax (TDS)</span>
                <span className="font-bold text-slate-705">₹{record.incomeTax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-slate-50/50 px-4 py-2.5 border-t border-slate-100 flex justify-between font-bold text-slate-800">
              <span>Total Deductions</span>
              <span>₹{record.deductions.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        {/* Net Salary Summary Callout */}
        <div className="bg-indigo-900 p-5 rounded-xl text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md shadow-indigo-900/10">
          <div>
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Net Take-Home Salary</span>
            <p className="text-xs text-indigo-200 mt-1 italic">Rupees {record.netSalary.toLocaleString('en-IN')} only</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-black font-mono tracking-tight text-indigo-100">
              ₹{record.netSalary.toLocaleString('en-IN')}
            </h2>
          </div>
        </div>

        {/* Signature placeholders */}
        <div className="flex justify-between items-end pt-12 text-xs">
          <div>
            <div className="w-48 border-b border-slate-300 pb-1 italic font-semibold text-slate-550">
              Ramesh Patel
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Prepared By (Finance Executive)</p>
          </div>
          <div className="text-right">
            <div className="w-48 border-b border-slate-300 pb-1 italic font-semibold text-slate-550 flex items-center justify-end gap-1">
              <Sparkles className="h-3 w-3 text-indigo-650" />
              HR Operations Director
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Authorized Signatory</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SalarySlip;
