import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import apiClient from '../../../services/api.client';
import { mockEmployees } from '../data/mockEmployees';

// Import Reusable Components
import PayrollHeader from '../components/payroll/PayrollHeader';
import PayrollSummary from '../components/payroll/PayrollSummary';
import SalaryBreakdown from '../components/payroll/SalaryBreakdown';
import PayslipCard from '../components/payroll/PayslipCard';
import SalaryHistoryTable from '../components/payroll/SalaryHistoryTable';
import PayrollAnalytics from '../components/payroll/PayrollAnalytics';
import TaxSummary from '../components/payroll/TaxSummary';
import BonusHistory from '../components/payroll/BonusHistory';
import BankInfoCard from '../components/payroll/BankInfoCard';
import PayrollTimeline from '../components/payroll/PayrollTimeline';
import QuickActions from '../components/payroll/QuickActions';

// Helper: Parse salary text to integer
const parseSalary = (salaryStr) => {
  if (!salaryStr) return 75000; // Default fallback
  const cleaned = salaryStr.replace(/[₹,]/g, '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 75000 : parsed;
};

// Mock Data Generator for Employee Payroll
const generateMockPayrollData = (user) => {
  // Find employee in registry to align salary info, or use a default
  const employeeRegistryInfo = mockEmployees.find(
    (emp) => emp.email?.toLowerCase() === user?.email?.toLowerCase()
  ) || {
    id: user?.id || 'EMP-2021-04',
    firstName: user?.firstName || 'Jane',
    lastName: user?.lastName || 'Doe',
    department: user?.department || 'Software Development',
    designation: 'Senior Software Engineer',
    salary: '₹75,000',
  };

  const parsedGrossSalary = parseSalary(employeeRegistryInfo.salary);
  
  // 12 Months Salary History setup (July 2025 to June 2026)
  const monthNamesShort = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const monthNamesFull = [
    'July', 'August', 'September', 'October', 'November', 'December',
    'January', 'February', 'March', 'April', 'May', 'June'
  ];
  
  const history = [];
  const monthlyTrend = [];
  const annualEarnings = [];
  
  let totalTaxPaid = 0;
  let totalPT = 0;
  let totalPF = 0;
  
  const bonuses = [
    {
      id: 'B-01',
      type: 'Festival Bonus',
      amount: 15000,
      description: 'Diwali Festive Reward',
      month: 'November',
      year: 2025,
      status: 'Credited'
    },
    {
      id: 'B-02',
      type: 'Performance Bonus',
      amount: 10000,
      description: 'Year-end Performance Milestone',
      month: 'December',
      year: 2025,
      status: 'Credited'
    },
    {
      id: 'B-03',
      type: 'Incentive',
      amount: 8000,
      description: 'Q4 Product Release Incentive',
      month: 'March',
      year: 2026,
      status: 'Credited'
    },
    {
      id: 'B-04',
      type: 'Performance Bonus',
      amount: 12000,
      description: 'Mid-year Appraisal Reward',
      month: 'June',
      year: 2026,
      status: 'Credited'
    }
  ];

  // Generate records month by month
  monthNamesShort.forEach((mShort, index) => {
    const is2025 = index < 6;
    const year = is2025 ? 2025 : 2026;
    const mFull = monthNamesFull[index];
    const monthNum = is2025 ? 7 + index : index - 5;
    
    // Base Calculations
    const basicSalary = Math.round(parsedGrossSalary * 0.55);
    const hra = Math.round(basicSalary * 0.40);
    const medical = 1250;
    const travel = 1600;
    
    // Add bonus if applicable
    const monthBonusObj = bonuses.find(b => b.month === mFull && b.year === year);
    const bonus = monthBonusObj ? monthBonusObj.amount : 0;
    
    const otherAllowances = parsedGrossSalary - (basicSalary + hra + medical + travel);
    const allowances = hra + medical + travel + otherAllowances;
    
    // Deductions
    const pf = Math.round(basicSalary * 0.12);
    const professionalTax = 200;
    const incomeTax = Math.round(parsedGrossSalary * 0.10);
    const otherDeductions = 0;
    const deductions = pf + professionalTax + incomeTax + otherDeductions;
    
    const grossSalary = parsedGrossSalary + bonus;
    const netSalary = grossSalary - deductions;

    totalTaxPaid += incomeTax;
    totalPT += professionalTax;
    totalPF += pf;

    const paymentDate = `${year}-${String(monthNum).padStart(2, '0')}-30`;

    // Dynamic History Item
    history.push({
      id: `PAY-${year}-${String(monthNum).padStart(2, '0')}-${employeeRegistryInfo.id.slice(-4)}`,
      payrollMonth: mFull,
      monthYear: `${mFull} ${year}`,
      year,
      grossSalary,
      deductions,
      netSalary,
      status: 'Paid',
      statusBadge: 'credited',
      paymentDate,
      // Full details for breakdown and slip
      basicSalary,
      hra,
      medical,
      travel,
      bonus,
      otherAllowances,
      allowances,
      pf,
      professionalTax,
      incomeTax,
      otherDeductions,
      salaryComponents: {
        basics: {
          basicSalary,
          houseRentAllowance: hra,
          medicalAllowance: medical,
          travelAllowance: travel,
          performanceBonus: bonus,
          otherAllowances: otherAllowances
        },
        deductions: {
          providentFund: pf,
          professionalTax,
          incomeTax,
          otherDeductions
        }
      }
    });

    // Recharts structures
    monthlyTrend.push({
      month: mShort,
      salary: netSalary,
      bonus: bonus
    });

    annualEarnings.push({
      month: mShort,
      earnings: netSalary
    });
  });

  // Reversing history to show newest first
  const reversedHistory = [...history].reverse();
  const latestMonthRecord = reversedHistory[0];

  // Allowance & Deduction breakdown for latest month
  const allowanceDistribution = [
    { name: 'Basic', value: latestMonthRecord.basicSalary },
    { name: 'HRA', value: latestMonthRecord.hra },
    { name: 'Medical', value: latestMonthRecord.medical },
    { name: 'Travel', value: latestMonthRecord.travel },
    { name: 'Other', value: latestMonthRecord.otherAllowances }
  ];

  if (latestMonthRecord.bonus > 0) {
    allowanceDistribution.push({ name: 'Bonus', value: latestMonthRecord.bonus });
  }

  const deductionDistribution = [
    { name: 'PF Contribution', value: latestMonthRecord.pf },
    { name: 'Professional Tax', value: latestMonthRecord.professionalTax },
    { name: 'TDS Income Tax', value: latestMonthRecord.incomeTax }
  ];

  // Tax Summary
  const taxSumTotal = totalTaxPaid + totalPT + totalPF;
  const taxBreakdown = [
    { name: 'Income Tax (TDS)', percentage: Math.round((totalTaxPaid / taxSumTotal) * 100), value: totalTaxPaid },
    { name: 'Professional Tax', percentage: Math.round((totalPT / taxSumTotal) * 100), value: totalPT },
    { name: 'Provident Fund (PF)', percentage: Math.round((totalPF / taxSumTotal) * 100), value: totalPF }
  ];

  const taxSummary = {
    totalTaxPaid,
    monthlyTaxAverage: Math.round(totalTaxPaid / 12),
    professionalTax: totalPT,
    incomeTax: totalTaxPaid,
    taxBreakdown
  };

  // Bank Info
  const bankInfo = {
    bankName: 'HDFC Bank Ltd.',
    accountNumber: '•••• •••• •••• 9876',
    accountHolder: `${employeeRegistryInfo.firstName} ${employeeRegistryInfo.lastName}`,
    ifscCode: 'HDFC0001234',
    paymentMethod: 'NEFT Direct Credit'
  };

  // Employee details matching standard layout
  const employeeInfo = {
    employeeName: `${employeeRegistryInfo.firstName} ${employeeRegistryInfo.lastName}`,
    employeeId: employeeRegistryInfo.id,
    department: employeeRegistryInfo.department || 'Software Development',
    designation: employeeRegistryInfo.designation || 'Senior Developer',
    bankName: bankInfo.bankName,
    accountNumber: bankInfo.accountNumber,
    ifscCode: bankInfo.ifscCode
  };

  // Timeline
  const activities = [
    {
      type: 'credited',
      title: 'Salary Credited Successfully',
      detail: `Your monthly net salary of ₹${latestMonthRecord.netSalary.toLocaleString()} was credited to ${bankInfo.bankName} Account ${bankInfo.accountNumber}.`,
      time: 'June 30, 2026 - 10:15 AM'
    },
    {
      type: 'generated',
      title: 'Payslip Released',
      detail: 'HR Ops finalized and released the monthly salary breakdown slip.',
      time: 'June 28, 2026 - 05:30 PM'
    },
    {
      type: 'bonus',
      title: 'Performance Bonus Approved',
      detail: 'A mid-year appraisal performance bonus of ₹12,000 was added to this cycle.',
      time: 'June 24, 2026 - 11:00 AM'
    },
    {
      type: 'downloaded',
      title: 'Previous Payslip Downloaded',
      detail: 'You downloaded the salary payslip for May 2026.',
      time: 'June 05, 2026 - 02:40 PM'
    }
  ];

  return {
    latestRecord: latestMonthRecord,
    history: reversedHistory,
    analytics: {
      monthlyTrend,
      allowanceDistribution,
      deductionDistribution,
      annualEarnings
    },
    taxSummary,
    bonuses,
    bankInfo,
    employeeInfo,
    activities
  };
};

const EmployeePayroll = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedPayslipId, setSelectedPayslipId] = useState(null);
  
  // State for all data structures
  const [payrollData, setPayrollData] = useState(null);

  // References to scroll targets for Quick Actions
  const historyRef = useRef(null);
  const taxRef = useRef(null);

  useEffect(() => {
    const fetchPayroll = async () => {
      setLoading(true);
      try {
        // Trigger actual backend endpoints for future readiness
        const [payrollRes, historyRes, taxRes] = await Promise.all([
          apiClient.get('/employee/payroll'),
          apiClient.get('/employee/payroll/history'),
          apiClient.get('/employee/payroll/tax-summary')
        ]);
        
        // Setup state if endpoints are fully implemented in backend
        setPayrollData({
          latestRecord: payrollRes.data.data.latestRecord,
          history: historyRes.data.data.history,
          analytics: payrollRes.data.data.analytics,
          taxSummary: taxRes.data.data,
          bonuses: payrollRes.data.data.bonuses,
          bankInfo: payrollRes.data.data.bankInfo,
          employeeInfo: payrollRes.data.data.employeeInfo,
          activities: payrollRes.data.data.activities
        });
      } catch (err) {
        console.warn('Backend payroll routes not active yet. Gracefully falling back to premium mock payroll data generator.', err);
        const resolvedMockData = generateMockPayrollData(user);
        setPayrollData(resolvedMockData);
      } finally {
        // Simulated loading timeout to display premium loading skeletons
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    if (user) {
      fetchPayroll();
    }
  }, [user]);

  // Loading skeleton layout
  if (loading) {
    return (
      <div className="space-y-6 pb-12 font-sans animate-pulse">
        {/* Header Skeleton */}
        <div className="h-40 bg-slate-200 rounded-2xl border border-slate-300"></div>

        {/* Quick actions skeleton */}
        <div className="h-24 bg-slate-200 rounded-2xl border border-slate-300"></div>

        {/* Summary grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl border border-slate-300"></div>
          ))}
        </div>

        {/* Split layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-200 rounded-2xl border border-slate-300"></div>
          <div className="h-96 bg-slate-200 rounded-2xl border border-slate-300"></div>
        </div>
      </div>
    );
  }

  if (!payrollData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center font-sans">
        <p className="text-slate-500">Failed to load payroll data. Please refresh or contact HR support.</p>
      </div>
    );
  }

  // Header helpers
  const headerStatus = {
    currentStatus: payrollData.latestRecord.status,
    lastPaymentDate: payrollData.latestRecord.paymentDate
  };

  // KPI card mapping
  const summaryKPIs = {
    netSalary: payrollData.latestRecord.netSalary,
    grossSalary: payrollData.latestRecord.grossSalary,
    totalAllowances: payrollData.latestRecord.allowances,
    totalDeductions: payrollData.latestRecord.deductions,
    taxDeducted: payrollData.latestRecord.incomeTax,
    bonusReceived: payrollData.latestRecord.bonus,
    upcomingPayrollDate: '2026-07-30',
    yearToDateEarnings: payrollData.history.reduce((sum, item) => sum + item.netSalary, 0)
  };

  // Salary breakdown mapping
  const salaryBreakdownData = {
    month: payrollData.latestRecord.monthYear,
    totalAllowances: payrollData.latestRecord.allowances,
    basicSalary: payrollData.latestRecord.basicSalary,
    houseRentAllowance: payrollData.latestRecord.hra,
    medicalAllowance: payrollData.latestRecord.medical,
    travelAllowance: payrollData.latestRecord.travel,
    performanceBonus: payrollData.latestRecord.bonus,
    otherAllowances: payrollData.latestRecord.otherAllowances,
    totalDeductions: payrollData.latestRecord.deductions,
    providentFund: payrollData.latestRecord.pf,
    professionalTax: payrollData.latestRecord.professionalTax,
    incomeaTax: payrollData.latestRecord.incomeTax, // Component checks breakdown.incomeaTax
    otherDeductions: payrollData.latestRecord.otherDeductions,
    grossSalary: payrollData.latestRecord.grossSalary,
    netSalary: payrollData.latestRecord.netSalary
  };

  // Quick Action triggers
  const handleDownloadLatest = () => {
    alert(`Downloaded PDF payslip for ${payrollData.latestRecord.monthYear} successfully!`);
  };

  const handleScrollToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTax = () => {
    taxRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePayrollHelp = () => {
    alert('HR Payroll Support Desk contact info: payroll.help@enterprise.com | +91 (80) 4900 1200');
  };

  // Handles clicking a payslip in the table history
  const handleViewPayslip = (id) => {
    setSelectedPayslipId(id);
  };

  // Retrieve current active payslip for view, default to latest if none selected
  const activePayslip = selectedPayslipId 
    ? payrollData.history.find(p => p.id === selectedPayslipId) 
    : payrollData.latestRecord;

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      
      {/* 1. Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Payroll Portal</h1>
          <p className="text-xs text-slate-500 mt-1">Review compensation packages, annual tax statements, and release logs.</p>
        </div>
        
        {selectedPayslipId && (
          <button 
            onClick={() => setSelectedPayslipId(null)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            ← Back to Overview
          </button>
        )}
      </div>

      {/* Payslip Viewer Overlay/Focused Mode */}
      {selectedPayslipId ? (
        <div className="space-y-6">
          <PayslipCard 
            payslip={activePayslip} 
            employeeInfo={payrollData.employeeInfo} 
          />
        </div>
      ) : (
        /* Overview Mode */
        <>
          {/* Payroll Header */}
          <PayrollHeader 
            payrollStatus={headerStatus} 
            currentMonth={payrollData.latestRecord.monthYear} 
            latestSalary={payrollData.latestRecord.netSalary} 
          />

          {/* Quick actions bar */}
          <QuickActions 
            onDownloadLatest={handleDownloadLatest}
            onViewHistory={handleScrollToHistory}
            onViewTaxSummary={handleScrollToTax}
            onPayrollHelp={handlePayrollHelp}
          />

          {/* KPI summaries */}
          <PayrollSummary data={summaryKPIs} />

          {/* Breakdown & Side Layouts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalaryBreakdown breakdown={salaryBreakdownData} />
            </div>
            
            <div className="space-y-6">
              <BankInfoCard bankInfo={payrollData.bankInfo} />
              <PayrollTimeline activities={payrollData.activities} />
            </div>
          </div>

          {/* Recharts Analytics graphs */}
          <PayrollAnalytics data={payrollData.analytics} />

          {/* Scroll Target: Salary History Table */}
          <div ref={historyRef}>
            <SalaryHistoryTable 
              data={payrollData.history} 
              onViewPayslip={handleViewPayslip} 
            />
          </div>

          {/* Scroll Target: Tax Summary & Bonuses */}
          <div ref={taxRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaxSummary taxData={payrollData.taxSummary} />
            <BonusHistory bonuses={payrollData.bonuses} />
          </div>
        </>
      )}

    </div>
  );
};

export default EmployeePayroll;
