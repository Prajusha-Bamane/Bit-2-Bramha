import React from 'react';
import DashboardHeader from './DashboardHeader';
import StatsGrid from './StatsGrid';
import QuickActions from './QuickActions';
import AttendanceChart from './AttendanceChart';
import DepartmentChart from './DepartmentChart';
import RecentEmployeesTable from './RecentEmployeesTable';
import LeaveRequestTable from './LeaveRequestTable';
import PayrollCard from './PayrollCard';
import ActivityTimeline from './ActivityTimeline';
import NotificationPanel from './NotificationPanel';
import CalendarWidget from './CalendarWidget';
import BirthdayWidget from './BirthdayWidget';
import HolidayWidget from './HolidayWidget';
import AnnouncementCard from './AnnouncementCard';
import PerformanceWidget from './PerformanceWidget';

const DashboardContainer = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Hero section */}
      <DashboardHeader />

      {/* 2. Operations Triggers shortcuts */}
      <QuickActions />

      {/* 3. Main KPI Statistics grid */}
      <StatsGrid />

      {/* Layout Split: 2/3 Main Viewport | 1/3 Right Column widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Data Tables, Analytics Charts, Operations Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recharts Data Visualization grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="min-h-[360px]">
              <AttendanceChart />
            </div>
            <div className="min-h-[360px]">
              <DepartmentChart />
            </div>
          </div>

          {/* Directory listings */}
          <RecentEmployeesTable />
          <LeaveRequestTable />

          {/* Financial calculations wrapper */}
          <PayrollCard />

          {/* Operations feeds grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActivityTimeline />
            <NotificationPanel />
          </div>
        </div>

        {/* Right Column: Calendar grid, countdowns, bullet boards, and score meters */}
        <div className="space-y-6">
          <CalendarWidget />
          <PerformanceWidget />
          <BirthdayWidget />
          <HolidayWidget />
          <AnnouncementCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
