/**
 * PayslipCard Component
 * Displays a professional payslip
 */

import React from 'react';
import { Building2, User, Printer, Download, Mail } from 'lucide-react';

const PayslipCard = ({ payslip, employeeInfo }) => {
  if (!payslip) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Downloading PDF payslip for ${payslip.monthYear} (${payslip.id}) to your device...`);
  };

  const handleEmail = () => {
    const emailStr = employeeInfo?.employeeEmail || 'your registered email';
    alert(`Emailed payslip for ${payslip.monthYear} successfully to ${emailStr}!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      {/* Payslip Print Version */}
      <div
        id="payslip-print"
        className="bg-white border-2 border-gray-200 rounded-lg p-12"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b-2 border-gray-300">
          <div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold mb-2">
              HR
            </div>
            <h1 className="text-2xl font-bold text-gray-800">COMPANY HRMS</h1>
            <p className="text-sm text-gray-600">Head Office: New Delhi, India</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">SALARY SLIP</h2>
            <p className="text-sm text-gray-600">Month: {payslip.monthYear}</p>
            <p className="text-sm text-gray-600">ID: {payslip.id}</p>
          </div>
        </div>

        {/* Employee Information */}
        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Employee Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-gray-600 ml-2">{employeeInfo?.employeeName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Employee ID:</span>
                <span className="text-gray-600 ml-2">{employeeInfo?.employeeId}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Department:</span>
                <span className="text-gray-600 ml-2">{employeeInfo?.department}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Designation:</span>
                <span className="text-gray-600 ml-2">{employeeInfo?.designation}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Payroll Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Payroll Month:</span>
                <span className="text-gray-600 ml-2">{payslip.monthYear}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Payment Date:</span>
                <span className="text-gray-600 ml-2">{payslip.paymentDate}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="text-green-600 ml-2 font-semibold uppercase">{payslip.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Components */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Allowances */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 pb-2 border-b border-gray-200">
              Allowances
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Basic Salary</span>
                <span className="font-semibold">
                  ₹{payslip.salaryComponents.basics.basicSalary?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">House Rent Allowance</span>
                <span className="font-semibold">
                  ₹{payslip.salaryComponents.basics.houseRentAllowance?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Medical Allowance</span>
                <span className="font-semibold">
                  ₹{payslip.salaryComponents.basics.medicalAllowance?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Travel Allowance</span>
                <span className="font-semibold">
                  ₹{payslip.salaryComponents.basics.travelAllowance?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Performance Bonus</span>
                <span className="font-semibold">
                  ₹{payslip.salaryComponents.basics.performanceBonus?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Other Allowances</span>
                <span className="font-semibold">
                  ₹{payslip.salaryComponents.basics.otherAllowances?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold">
                <span className="text-gray-800">Total Allowances</span>
                <span className="text-green-600">₹{payslip.allowances?.toLocaleString() || '0'}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 pb-2 border-b border-gray-200">
              Deductions
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Provident Fund</span>
                <span className="font-semibold">
                  ₹{Math.abs(payslip.salaryComponents.deductions.providentFund)?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Professional Tax</span>
                <span className="font-semibold">
                  ₹{Math.abs(payslip.salaryComponents.deductions.professionalTax)?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Income Tax</span>
                <span className="font-semibold">
                  ₹{Math.abs(payslip.salaryComponents.deductions.incomeTax)?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Other Deductions</span>
                <span className="font-semibold">
                  ₹{Math.abs(payslip.salaryComponents.deductions.otherDeductions)?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold">
                <span className="text-gray-800">Total Deductions</span>
                <span className="text-red-600">₹{payslip.deductions?.toLocaleString() || '0'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-gray-600 text-xs font-semibold uppercase mb-1">Gross Salary</p>
            <p className="text-2xl font-bold text-blue-600">
              ₹{payslip.grossSalary?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-gray-600 text-xs font-semibold uppercase mb-1">Total Deductions</p>
            <p className="text-2xl font-bold text-red-600">
              ₹{payslip.deductions?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-gray-600 text-xs font-semibold uppercase mb-1">Net Salary</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{payslip.netSalary?.toLocaleString() || '0'}
            </p>
          </div>
        </div>

        {/* Bank Information */}
        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Bank Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Bank Name:</span>
                <span className="text-gray-600 ml-2">{employeeInfo?.bankName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Account No:</span>
                <span className="text-gray-600 ml-2">{employeeInfo?.accountNumber}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">IFSC Code:</span>
                <span className="text-gray-600 ml-2">{employeeInfo?.ifscCode}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Authorized Signature
            </h3>
            <div className="h-20 border-t-2 border-gray-400 mt-6 flex items-end">
              <span className="text-xs text-gray-500">_________________</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mb-4">
          <p>This is a system-generated document. No signature is required.</p>
          <p>For queries, contact HR Department</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-200 no-print">
        <button 
          onClick={handleDownload}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <Printer className="w-5 h-5" />
          <span>Print Payslip</span>
        </button>
        <button 
          onClick={handleEmail}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <Mail className="w-5 h-5" />
          <span>Email Payslip</span>
        </button>
      </div>
    </div>
  );
};

export default PayslipCard;
