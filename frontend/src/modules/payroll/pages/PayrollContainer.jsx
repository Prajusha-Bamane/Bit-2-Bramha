import React, { useState } from 'react';
import PayrollDashboard from '../components/PayrollDashboard';
import PayrollTable from '../components/PayrollTable';
import PayrollGenerator from '../components/PayrollGenerator';
import SalarySlip from '../components/SalarySlip';
import { mockPayroll } from '../data/mockPayroll';
import { mockEmployees } from '../../employee/data/mockEmployees';
import { LayoutDashboard, FileSpreadsheet, Settings } from 'lucide-react';

const PayrollContainer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSlip, setSelectedSlip] = useState(null);

  // Run generator batch complete handler
  const handleGeneratorComplete = (month, year, department) => {
    // Generate new mock records matching active employees for this cycle
    const filteredEmployees = department 
      ? mockEmployees.filter(e => e.department === department) 
      : mockEmployees;

    const startId = mockPayroll.length + 1;
    const newRecords = filteredEmployees.map((emp, index) => {
      const basicSalary = emp.role === 'Admin' ? 180000 : (emp.role === 'Manager' ? 120000 : 60000);
      const hra = basicSalary * 0.4;
      const travel = basicSalary * 0.1;
      const medical = basicSalary * 0.05;
      const allowances = hra + travel + medical;

      const pf = basicSalary * 0.12;
      const professionalTax = 200;
      const incomeTax = basicSalary * 0.1;
      const deductions = pf + professionalTax + incomeTax;

      const bonus = 0;
      const netSalary = basicSalary + allowances + bonus - deductions;

      return {
        id: `PAY-${(startId + index).toString().padStart(4, '0')}`,
        employeeId: emp.id,
        firstName: emp.firstName,
        lastName: emp.lastName,
        department: emp.department,
        designation: emp.designation,
        basicSalary,
        allowances,
        deductions,
        bonus,
        netSalary,
        status: 'Paid',
        month,
        year,
        paymentDate: new Date().toISOString().split('T')[0],
        hra,
        travel,
        medical,
        pf,
        professionalTax,
        incomeTax,
      };
    });

    // Unshift into database
    newRecords.forEach(rec => mockPayroll.unshift(rec));
    setActiveTab('ledger');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 no-print">
        <div>
          <h1 className="text-2xl font-black text-slate-850 tracking-tight font-sans">Payroll Systems</h1>
          <p className="text-xs text-slate-500 mt-0.5">Release monthly salaries, audit tax deductions, and download payslip sheets.</p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto border border-slate-200/50">
          <button
            onClick={() => { setActiveTab('dashboard'); setSelectedSlip(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('run'); setSelectedSlip(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'run' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <Settings className="h-4 w-4" />
            Run Payroll
          </button>
          <button
            onClick={() => { setActiveTab('ledger'); setSelectedSlip(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ledger' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <FileSpreadsheet className="h-4 w-4" />
            Ledger Logs
          </button>
        </div>
      </div>

      {/* 2. Main Viewport routing */}
      <div className="space-y-6">
        
        {activeTab === 'dashboard' && (
          <PayrollDashboard />
        )}

        {activeTab === 'run' && (
          <PayrollGenerator onComplete={handleGeneratorComplete} />
        )}

        {activeTab === 'ledger' && (
          <>
            {selectedSlip ? (
              <SalarySlip 
                record={selectedSlip} 
                onBack={() => setSelectedSlip(null)} 
              />
            ) : (
              <PayrollTable 
                records={mockPayroll} 
                onViewSlip={(log) => setSelectedSlip(log)}
              />
            )}
          </>
        )}

      </div>

    </div>
  );
};

export default PayrollContainer;
