/**
 * BankInfoCard Component
 * Displays bank account information for salary credit
 */

import React from 'react';
import { Building2, CreditCard, Code, User } from 'lucide-react';

const BankInfoCard = ({ bankInfo }) => {
  if (!bankInfo) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Bank Information</h2>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 shadow-lg">
        {/* Credit Card Style Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="text-blue-100 text-sm font-semibold mb-2">Bank Account</p>
            <h3 className="text-2xl font-bold">{bankInfo.bankName || 'Bank Name'}</h3>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Valid Till</p>
            <p className="text-xl font-bold">12/28</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-blue-100 text-xs font-semibold uppercase mb-2">Account Number</p>
            <p className="text-xl font-mono font-bold">{bankInfo.accountNumber || 'XXXX XXXX XXXX XXXX'}</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs font-semibold uppercase mb-2">Account Holder</p>
            <p className="text-xl font-bold">{bankInfo.accountHolder || 'Account Holder'}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-xs font-semibold">IFSC CODE</p>
            <p className="text-lg font-mono font-bold">{bankInfo.ifscCode || 'IFSC0000XXX'}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-xs font-semibold">PAYMENT METHOD</p>
            <p className="text-lg font-bold">{bankInfo.paymentMethod || 'Direct Transfer'}</p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Bank Details */}
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-500 text-white rounded-lg p-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Bank Details</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm font-medium">Bank Name</p>
              <p className="text-gray-800 font-semibold">{bankInfo.bankName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Payment Method</p>
              <p className="text-gray-800 font-semibold">{bankInfo.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-500 text-white rounded-lg p-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Account Details</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm font-medium">Account Holder</p>
              <p className="text-gray-800 font-semibold">{bankInfo.accountHolder}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Account Type</p>
              <p className="text-gray-800 font-semibold">Savings Account</p>
            </div>
          </div>
        </div>

        {/* IFSC Code */}
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-500 text-white rounded-lg p-3">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">IFSC Code</h3>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium mb-2">Indian Financial System Code</p>
            <p className="text-2xl font-mono font-bold text-green-600">{bankInfo.ifscCode}</p>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-yellow-500 text-white rounded-lg p-3">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Account Status</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-gray-800 font-semibold">Active & Verified</p>
          </div>
          <p className="text-sm text-gray-600 mt-3">Salary is credited on last working day of month</p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Note:</span> Ensure bank account details are correct. Any mismatch may
          delay salary credit.
        </p>
      </div>
    </div>
  );
};

export default BankInfoCard;
