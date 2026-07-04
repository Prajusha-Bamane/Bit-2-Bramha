import React, { useState, useEffect, useRef } from 'react';
import AttendanceHeader from '../components/employee/AttendanceHeader';
import TodayAttendanceCard from '../components/employee/TodayAttendanceCard';
import AttendanceSummary from '../components/employee/AttendanceSummary';
import CalendarWidget from '../components/employee/CalendarWidget';
import AttendanceHistoryTable from '../components/employee/AttendanceHistoryTable';
import AttendanceChart from '../components/employee/AttendanceChart';
import WorkingTimer from '../components/employee/WorkingTimer';
import CheckInPanel from '../components/employee/CheckInPanel';
import ActivityTimeline from '../components/employee/ActivityTimeline';
import AttendanceStatistics from '../components/employee/AttendanceStatistics';
import { mockAttendanceHistory, mockAttendanceSummary } from '../data/mockEmployeeAttendance';

const EmployeeAttendanceContainer = () => {
  // Timers and toggles
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  
  const [checkInTime, setCheckInTime] = useState('--:--');
  const [checkOutTime, setCheckOutTime] = useState('--:--');
  const [timer, setTimer] = useState('00h 00m 00s');
  const [breakTimer, setBreakTimer] = useState('00h 00m 00s');
  
  const [status, setStatus] = useState('Clocked Out');
  const [location, setLocation] = useState('Remote (VPN Secure)');
  const [device, setDevice] = useState('Web Portal');
  const [lateBy, setLateBy] = useState(null);
  const [overtime, setOvertime] = useState(0);

  const [activities, setActivities] = useState([]);
  const [history, setHistory] = useState(mockAttendanceHistory);

  // Refs for tracking elapsed time accurately
  const activeTimerRef = useRef(null);
  const breakTimerRef = useRef(null);
  
  const workingSecsRef = useRef(0);
  const breakSecsRef = useRef(0);

  // Format seconds to HHh MMm SSs
  const formatSecs = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`;
  };

  useEffect(() => {
    if (isClockedIn && !isBreak) {
      // Start active timer
      activeTimerRef.current = setInterval(() => {
        workingSecsRef.current += 1;
        setTimer(formatSecs(workingSecsRef.current));
      }, 1000);
    } else {
      if (activeTimerRef.current) clearInterval(activeTimerRef.current);
    }

    if (isClockedIn && isBreak) {
      // Start break timer
      breakTimerRef.current = setInterval(() => {
        breakSecsRef.current += 1;
        setBreakTimer(formatSecs(breakSecsRef.current));
      }, 1000);
    } else {
      if (breakTimerRef.current) clearInterval(breakTimerRef.current);
    }

    return () => {
      if (activeTimerRef.current) clearInterval(activeTimerRef.current);
      if (breakTimerRef.current) clearInterval(breakTimerRef.current);
    };
  }, [isClockedIn, isBreak]);

  const handleClockToggle = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (!isClockedIn) {
      // Clock In
      setIsClockedIn(true);
      setIsBreak(false);
      setCheckInTime(timeStr);
      setCheckOutTime('--:--');
      setStatus('Clocked In');
      setTimer('00h 00m 00s');
      
      // Calculate late entry threshold (9:15 AM)
      const hours = now.getHours();
      const mins = now.getMinutes();
      if ((hours === 9 && mins > 15) || hours > 9) {
        const lateMinDiff = (hours - 9) * 60 + (mins - 15);
        setLateBy(`${lateMinDiff} mins`);
      } else {
        setLateBy(null);
      }

      const newAct = {
        icon: 'CheckIn',
        text: `Checked in securely from remote IP.`,
        time: timeStr
      };
      setActivities([newAct, ...activities]);
    } else {
      // Clock Out
      setIsClockedIn(false);
      setIsBreak(false);
      setCheckOutTime(timeStr);
      setStatus('Clocked Out');

      // Calculate overtime (decimal hours > 8.0)
      const finalWorkingHrs = workingSecsRef.current / 3600;
      if (finalWorkingHrs > 8.0) {
        setOvertime(parseFloat((finalWorkingHrs - 8.0).toFixed(2)));
      }

      const newAct = {
        icon: 'CheckOut',
        text: `Clocked out session. Total shifts recorded.`,
        time: timeStr
      };

      // Append session entry to table log history!
      const newHistoryLog = {
        date: now.toISOString().split('T')[0],
        checkIn: checkInTime,
        checkOut: timeStr,
        workingHours: parseFloat(finalWorkingHrs.toFixed(2)),
        breakHours: parseFloat((breakSecsRef.current / 3600).toFixed(2)),
        status: lateBy ? 'Late' : 'Present',
        location: 'Remote',
        device: 'Web Portal',
        overtime: finalWorkingHrs > 8.0 ? parseFloat((finalWorkingHrs - 8.0).toFixed(2)) : 0
      };

      setHistory([newHistoryLog, ...history]);
      setActivities([newAct, ...activities]);
    }
  };

  const handleBreakToggle = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (!isBreak) {
      // Start break
      setIsBreak(true);
      const newAct = {
        icon: 'StartBreak',
        text: 'Started rest break.',
        time: timeStr
      };
      setActivities([newAct, ...activities]);
    } else {
      // End break
      setIsBreak(false);
      const newAct = {
        icon: 'EndBreak',
        text: 'Resumed working session.',
        time: timeStr
      };
      setActivities([newAct, ...activities]);
    }
  };

  const getWorkingHoursTodayText = () => {
    if (workingSecsRef.current === 0) return '--';
    const hrs = Math.floor(workingSecsRef.current / 3600);
    const mins = Math.floor((workingSecsRef.current % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* 1. Header portal banner */}
      <AttendanceHeader
        status={status}
        workingHoursToday={getWorkingHoursTodayText()}
      />

      {/* 2. Top-level Shift Actions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CheckInPanel
          isClockedIn={isClockedIn}
          isBreak={isBreak}
          onClockToggle={handleClockToggle}
          onBreakToggle={handleBreakToggle}
        />
        <WorkingTimer
          timer={timer}
          isClockedIn={isClockedIn}
          isBreak={isBreak}
          breakTimer={breakTimer}
        />
        <TodayAttendanceCard
          checkInTime={checkInTime}
          checkOutTime={checkOutTime}
          status={status}
          timer={timer}
          breakTimer={breakTimer}
          location={location}
          device={device}
          lateBy={lateBy}
          overtime={overtime}
        />
      </div>

      {/* 3. Monthly Performance KPI summaries */}
      <AttendanceSummary summary={mockAttendanceSummary} />

      {/* 4. Attendance Calendar and Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <CalendarWidget attendanceHistory={history} />
        </div>
        <div className="space-y-6">
          <AttendanceStatistics history={history} />
          <ActivityTimeline activities={activities} />
        </div>
      </div>

      {/* 5. Recharts Visualizations */}
      <AttendanceChart history={history} />

      {/* 6. History Logs table */}
      <AttendanceHistoryTable attendanceHistory={history} />
    </div>
  );
};

export default EmployeeAttendanceContainer;
