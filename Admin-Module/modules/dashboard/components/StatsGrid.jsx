import React from 'react';
import StatCard from './StatCard';
import { 
  Users, 
  UserCheck, 
  UserX, 
  CalendarX, 
  Clock, 
  FileClock, 
  Banknote, 
  Workflow 
} from 'lucide-react';

const StatsGrid = () => {
  // Hardcoded statistical snapshot mapping required metrics
  const stats = [
    {
      title: "Total Employees",
      value: "1,248",
      comparison: "Active in database",
      trend: "+12% MoM",
      isPositive: true,
      icon: Users,
      accentColor: { bg: 'bg-blue-50', text: 'text-blue-600' }
    },
    {
      title: "Present Today",
      value: "1,180",
      comparison: "94.5% attendance rate",
      trend: "+1.2% daily",
      isPositive: true,
      icon: UserCheck,
      accentColor: { bg: 'bg-emerald-50', text: 'text-emerald-600' }
    },
    {
      title: "Absent Today",
      value: "22",
      comparison: "Unexcused checkins missing",
      trend: "-5.3% weekly",
      isPositive: true,
      icon: UserX,
      accentColor: { bg: 'bg-rose-50', text: 'text-rose-600' }
    },
    {
      title: "Employees on Leave",
      value: "46",
      comparison: "Approved vacation logs",
      trend: "+4.1% MoM",
      isPositive: false,
      icon: CalendarX,
      accentColor: { bg: 'bg-amber-50', text: 'text-amber-600' }
    },
    {
      title: "Late Check-ins",
      value: "14",
      comparison: "Clocked in after 09:15 AM",
      trend: "+18.2% daily",
      isPositive: false,
      icon: Clock,
      accentColor: { bg: 'bg-orange-50', text: 'text-orange-600' }
    },
    {
      title: "Pending Leaves",
      value: "8",
      comparison: "Awaiting supervisor action",
      trend: "-22.1% weekly",
      isPositive: true,
      icon: FileClock,
      accentColor: { bg: 'bg-purple-50', text: 'text-purple-600' }
    },
    {
      title: "Payroll Processed",
      value: "98%",
      comparison: "June Cycle completed",
      trend: "On schedule",
      isPositive: true,
      icon: Banknote,
      accentColor: { bg: 'bg-indigo-50', text: 'text-indigo-600' }
    },
    {
      title: "Departments",
      value: "7",
      comparison: "Active operational structures",
      trend: "Stable",
      isPositive: true,
      icon: Workflow,
      accentColor: { bg: 'bg-teal-50', text: 'text-teal-600' }
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
