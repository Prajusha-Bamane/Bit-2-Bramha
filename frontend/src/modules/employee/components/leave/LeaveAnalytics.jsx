import React from 'react';
import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const monthlyTrend = [
  { month: 'Jan', leaves: 3 },
  { month: 'Feb', leaves: 4 },
  { month: 'Mar', leaves: 2 },
  { month: 'Apr', leaves: 5 },
  { month: 'May', leaves: 3 },
  { month: 'Jun', leaves: 4 },
  { month: 'Jul', leaves: 6 },
];

const distribution = [
  { name: 'Casual', value: 28 },
  { name: 'Sick', value: 22 },
  { name: 'Earned', value: 18 },
  { name: 'WFH', value: 16 },
  { name: 'Emergency', value: 16 },
];

const approvalRate = [
  { name: 'Approved', value: 78 },
  { name: 'Pending', value: 12 },
  { name: 'Rejected', value: 10 },
];

const LeaveAnalytics = () => {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Leave analytics</p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900">Monthly leave trend</h3>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="leaves" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Type distribution</p>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" outerRadius={80} fill="#10b981" />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Approval rate</p>
          <div className="mt-6 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={approvalRate}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveAnalytics;
