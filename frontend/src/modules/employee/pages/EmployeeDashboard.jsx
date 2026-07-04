import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import PersonalStatCard from '../components/dashboard/PersonalStatCard';
import AttendanceWidget from '../components/dashboard/AttendanceWidget';
import LeaveWidget from '../components/dashboard/LeaveWidget';
import PayrollWidget from '../components/dashboard/PayrollWidget';
import QuickActions from '../components/dashboard/QuickActions';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import NotificationPanel from '../components/dashboard/NotificationPanel';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import { mockEmployee } from '../data/mockEmployeeData';
import { Calendar as CalendarIcon, ShieldAlert, Award, FileSpreadsheet, Hourglass, CheckSquare } from 'lucide-react';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  // State for attendance logs
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('--:--');
  const [checkOutTime, setCheckOutTime] = useState('--:--');
  const [timer, setTimer] = useState('00:00:00');
  const [status, setStatus] = useState('Clocked Out');
  
  const [activities, setActivities] = useState(mockEmployee.activities);
  const [kpis, setKpis] = useState(mockEmployee.kpis);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isClockedIn) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsedMs = Date.now() - startTimeRef.current;
        const totalSecs = Math.floor(elapsedMs / 1000);
        const hrs = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        
        const pad = (num) => String(num).padStart(2, '0');
        setTimer(`${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isClockedIn]);

  const handleClockToggle = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    if (!isClockedIn) {
      // Clock In
      setIsClockedIn(true);
      setCheckInTime(timeStr);
      setCheckOutTime('--:--');
      setStatus('Clocked In');
      
      // Update stats and audit logs
      const newActivity = {
        icon: 'CheckIn',
        text: `Checked in remotely from VPN secure node.`,
        time: 'Just now'
      };
      setActivities([newActivity, ...activities]);
      setKpis(prev => ({
        ...prev,
        hoursThisWeek: prev.hoursThisWeek + 0.1
      }));
    } else {
      // Clock Out
      setIsClockedIn(false);
      setCheckOutTime(timeStr);
      setStatus('Clocked Out');
      
      // Log audit
      const newActivity = {
        icon: 'CheckIn',
        text: `Checked out session at ${timeStr}.`,
        time: 'Just now'
      };
      setActivities([newActivity, ...activities]);
    }
  };

  const handleApplyLeave = () => {
    navigate('/employee/leaves');
  };

  const handleDownloadPayslip = () => {
    navigate('/employee/payroll');
  };

  const handleViewAttendance = () => {
    navigate('/employee/attendance');
  };

  const handleEditProfile = () => {
    navigate('/employee/profile');
  };

  const handleViewDocuments = () => {
    navigate('/employee/documents');
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* 1. Welcomer header */}
      <WelcomeBanner employee={mockEmployee} />

      {/* 2. Self Service operation shortcuts */}
      <QuickActions
        isClockedIn={isClockedIn}
        onClockToggle={handleClockToggle}
        onApplyLeave={handleApplyLeave}
        onDownloadPayslip={handleDownloadPayslip}
        onViewAttendance={handleViewAttendance}
        onEditProfile={handleEditProfile}
        onViewDocuments={handleViewDocuments}
      />

      {/* 3. Personal KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <PersonalStatCard
          title="Attendance rate"
          value={`${kpis.attendanceRate}%`}
          icon={CheckSquare}
          description="Consistent logs"
          trend="+0.4%"
          trendType="up"
          iconBg="bg-emerald-50 text-emerald-600 border border-emerald-100/50"
        />
        <PersonalStatCard
          title="Leave Balance"
          value={`${kpis.leaveBalance} Days`}
          icon={CalendarIcon}
          description="Paid time-off left"
          trend="16 days left"
          trendType="up"
          iconBg="bg-indigo-50 text-indigo-600 border border-indigo-100/50"
        />
        <PersonalStatCard
          title="Working Hours"
          value={`${kpis.hoursThisWeek} hrs`}
          icon={Hourglass}
          description="Logged this week"
          trend="38.5 hrs target"
          trendType="up"
          iconBg="bg-sky-50 text-sky-600 border border-sky-100/50"
        />
        <PersonalStatCard
          title="Next Salary Run"
          value="July 31"
          icon={Award}
          description="Direct bank deposit"
          trend="Scheduled"
          trendType="up"
          iconBg="bg-amber-50 text-amber-600 border border-amber-100/50"
        />
        <PersonalStatCard
          title="Pending Leaves"
          value={`${kpis.pendingLeaves} Request`}
          icon={FileSpreadsheet}
          description="Awaiting feedback"
          trend="In Review"
          trendType="down"
          iconBg="bg-purple-50 text-purple-600 border border-purple-100/50"
        />
        <PersonalStatCard
          title="Approved Leaves"
          value={`${kpis.approvedLeaves} Requests`}
          icon={CalendarIcon}
          description="Allocated this cycle"
          trend="Confirmed"
          trendType="up"
          iconBg="bg-rose-50 text-rose-600 border border-rose-100/50"
        />
      </div>

      {/* 4. Split layout dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 columns container */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AttendanceWidget
              isClockedIn={isClockedIn}
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
              timer={timer}
              status={status}
              location={mockEmployee.attendance.location}
              onClockToggle={handleClockToggle}
            />
            <LeaveWidget leaves={mockEmployee.leaves} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PayrollWidget 
              payroll={mockEmployee.payroll} 
              onViewPayroll={handleDownloadPayslip} 
            />
            <CalendarWidget />
          </div>
        </div>

        {/* Right side widgets column */}
        <div className="space-y-6">
          <UpcomingEvents events={mockEmployee.events} />
          <NotificationPanel notifications={mockEmployee.notifications} />
          <ActivityTimeline activities={activities} />
        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
