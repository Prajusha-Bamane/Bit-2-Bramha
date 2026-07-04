import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/api.client';
import { mockSettingsData } from '../data/mockSettingsData';

// Import Reusable Components
import SettingsLayout from '../components/SettingsLayout';
import GeneralSettingsCard from '../components/GeneralSettingsCard';
import CompanyProfileCard from '../components/CompanyProfileCard';
import DepartmentTable from '../components/DepartmentTable';
import DesignationTable from '../components/DesignationTable';
import RolePermissionMatrix from '../components/RolePermissionMatrix';
import HolidayTable from '../components/HolidayTable';
import ShiftTable from '../components/ShiftTable';
import LocationCard from '../components/LocationCard';
import EmailTemplateCard from '../components/EmailTemplateCard';
import NotificationSettings from '../components/NotificationSettings';
import SecurityCard from '../components/SecurityCard';
import AuditTable from '../components/AuditTable';
import PreferenceCard from '../components/PreferenceCard';

const AdminSettings = () => {
  const [activeItem, setActiveItem] = useState('profile');
  const [loading, setLoading] = useState(true);

  // Configuration States
  const [generalConfig, setGeneralConfig] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [workLocations, setWorkLocations] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [rolesPermissions, setRolesPermissions] = useState([]);

  // Fetch configs
  useEffect(() => {
    const fetchConfigs = async () => {
      setLoading(true);
      try {
        const [genRes, deptRes, desgRes, holRes, shiftRes, logRes] = await Promise.all([
          apiClient.get('/settings'),
          apiClient.get('/departments'),
          apiClient.get('/designations'),
          apiClient.get('/holidays'),
          apiClient.get('/shifts'),
          apiClient.get('/audit-logs')
        ]);
        setGeneralConfig(genRes.data.data.general);
        setCompanyProfile(genRes.data.data.profile);
        setDepartments(deptRes.data.data);
        setDesignations(desgRes.data.data);
        setHolidays(holRes.data.data);
        setShifts(shiftRes.data.data);
        setAuditLogs(logRes.data.data);
      } catch (err) {
        console.warn('Backend Settings API not active yet. Falling back to high-fidelity mock data engine.', err);
        
        // Populating state from mock data
        setGeneralConfig(mockSettingsData.general);
        setCompanyProfile(mockSettingsData.profile);
        setDepartments(mockSettingsData.departments);
        setDesignations(mockSettingsData.designations);
        setHolidays(mockSettingsData.holidays);
        
        // Initialize shifts mock data
        setShifts([
          { id: 'sh-1', name: 'Regular Day Shift', startTime: '09:00', endTime: '18:00', breakDuration: '60 Mins', workingHours: '8h 0m', status: 'Active' },
          { id: 'sh-2', name: 'APAC Early Morning', startTime: '06:00', endTime: '15:00', breakDuration: '60 Mins', workingHours: '8h 0m', status: 'Active' },
          { id: 'sh-3', name: 'US Night Shift', startTime: '21:00', endTime: '06:00', breakDuration: '60 Mins', workingHours: '8h 0m', status: 'Active' }
        ]);

        setWorkLocations(mockSettingsData.workLocations);
        setEmailTemplates(mockSettingsData.emailTemplates);
        setAuditLogs(mockSettingsData.auditLogs);
        setRolesPermissions(mockSettingsData.rolesPermissions);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchConfigs();
  }, []);

  // CRUD handlers for Departments
  const handleAddDepartment = async (newDept) => {
    try {
      await apiClient.post('/departments', newDept);
    } catch (err) {
      console.warn('API connection offline. Adding department locally.', err);
    }
    setDepartments(prev => [newDept, ...prev]);
    alert(`Department "${newDept.name}" created successfully!`);
  };

  const handleEditDepartment = async (updatedDept) => {
    try {
      await apiClient.put(`/departments/${updatedDept.id}`, updatedDept);
    } catch (err) {
      console.warn('API connection offline. Editing department locally.', err);
    }
    setDepartments(prev => prev.map(d => d.id === updatedDept.id ? updatedDept : d));
    alert(`Department "${updatedDept.name}" updated!`);
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await apiClient.delete(`/departments/${id}`);
    } catch (err) {
      console.warn('API connection offline. Deleting department locally.', err);
    }
    setDepartments(prev => prev.filter(d => d.id !== id));
  };

  const handleToggleDepartmentStatus = (id) => {
    setDepartments(prev =>
      prev.map(d => d.id === id ? { ...d, status: d.status === 'Active' ? 'Inactive' : 'Active' } : d)
    );
  };

  // CRUD handlers for Designations
  const handleAddDesignation = async (newDesg) => {
    setDesignations(prev => [newDesg, ...prev]);
    alert(`Designation "${newDesg.name}" created successfully!`);
  };

  const handleEditDesignation = (updatedDesg) => {
    setDesignations(prev => prev.map(d => d.id === updatedDesg.id ? updatedDesg : d));
    alert(`Designation "${updatedDesg.name}" updated!`);
  };

  const handleDeleteDesignation = (id) => {
    setDesignations(prev => prev.filter(d => d.id !== id));
  };

  // CRUD handlers for Holidays
  const handleAddHoliday = async (newHol) => {
    try {
      await apiClient.post('/holidays', newHol);
    } catch (err) {
      console.warn('API offline. Adding holiday locally.', err);
    }
    setHolidays(prev => [newHol, ...prev]);
    alert(`Holiday "${newHol.name}" scheduled!`);
  };

  const handleDeleteHoliday = (id) => {
    setHolidays(prev => prev.filter(h => h.id !== id));
  };

  // CRUD handlers for Shifts
  const handleAddShift = (newShift) => {
    setShifts(prev => [newShift, ...prev]);
    alert(`Work shift "${newShift.name}" registered!`);
  };

  const handleDeleteShift = (id) => {
    setShifts(prev => prev.filter(s => s.id !== id));
  };

  // CRUD handlers for Locations
  const handleAddLocation = (newLoc) => {
    setWorkLocations(prev => [newLoc, ...prev]);
    alert(`Office location "${newLoc.name}" added!`);
  };

  // Save general configs
  const handleSaveGeneral = async (updatedFields) => {
    try {
      await apiClient.put('/settings', { general: updatedFields });
    } catch (err) {
      console.warn('API offline. Saving configurations locally.', err);
    }
    setGeneralConfig(updatedFields);
    alert('General System settings updated!');
  };

  // Save company profile
  const handleSaveProfile = async (updatedProfile) => {
    try {
      await apiClient.put('/settings', { profile: updatedProfile });
    } catch (err) {
      console.warn('API offline. Saving company profile locally.', err);
    }
    setCompanyProfile(updatedProfile);
    alert('Company Organization Profile updated!');
  };

  // Save Email Templates
  const handleSaveTemplate = (updatedTemp) => {
    setEmailTemplates(prev => prev.map(t => t.id === updatedTemp.id ? updatedTemp : t));
  };

  // Save Permissions Access Matrix
  const handleSavePermissions = async (updatedMatrix) => {
    try {
      await apiClient.put('/roles', { matrix: updatedMatrix });
    } catch (err) {
      console.warn('API offline. Saving Access Matrix locally.', err);
    }
    setRolesPermissions(updatedMatrix);
  };

  if (loading) {
    return (
      <div className="space-y-6 pb-12 font-sans animate-pulse select-none">
        <div className="h-20 bg-slate-200 rounded-2xl border border-slate-350"></div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="w-full lg:w-68 h-96 bg-slate-200 rounded-2xl border border-slate-350"></div>
          <div className="flex-1 h-[500px] bg-slate-200 rounded-2xl border border-slate-350"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">System Administration</h1>
        <p className="text-xs text-slate-500 mt-1">Configure company profiles, department CRUD registers, shifts, role matrices, and audit logs.</p>
      </div>

      <SettingsLayout activeItem={activeItem} onItemSelect={setActiveItem}>
        
        {activeItem === 'profile' && (
          <CompanyProfileCard 
            profile={companyProfile} 
            onSave={handleSaveProfile} 
          />
        )}

        {activeItem === 'departments' && (
          <DepartmentTable
            departments={departments}
            onAdd={handleAddDepartment}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
            onToggleStatus={handleToggleDepartmentStatus}
          />
        )}

        {activeItem === 'designations' && (
          <DesignationTable
            designations={designations}
            departments={departments}
            onAdd={handleAddDesignation}
            onEdit={handleEditDesignation}
            onDelete={handleDeleteDesignation}
          />
        )}

        {activeItem === 'locations' && (
          <LocationCard
            locations={workLocations}
            onAdd={handleAddLocation}
          />
        )}

        {activeItem === 'general' && (
          <GeneralSettingsCard
            config={generalConfig}
            onSave={handleSaveGeneral}
          />
        )}

        {activeItem === 'holidays' && (
          <HolidayTable
            holidays={holidays}
            onAdd={handleAddHoliday}
            onDelete={handleDeleteHoliday}
          />
        )}

        {activeItem === 'shifts' && (
          <ShiftTable
            shifts={shifts}
            onAdd={handleAddShift}
            onDelete={handleDeleteShift}
          />
        )}

        {activeItem === 'roles' && (
          <RolePermissionMatrix
            rolesPermissions={rolesPermissions}
            onSave={handleSavePermissions}
          />
        )}

        {activeItem === 'security' && (
          <SecurityCard 
            onSave={(policy) => console.log('Saved security policy: ', policy)} 
          />
        )}

        {activeItem === 'audit' && (
          <AuditTable 
            auditLogs={auditLogs} 
          />
        )}

        {activeItem === 'templates' && (
          <EmailTemplateCard
            templates={emailTemplates}
            onSave={handleSaveTemplate}
          />
        )}

        {activeItem === 'notifications' && (
          <NotificationSettings 
            onSave={(notifs) => console.log('Saved notification settings: ', notifs)} 
          />
        )}

        {activeItem === 'preferences' && (
          <PreferenceCard />
        )}

      </SettingsLayout>

    </div>
  );
};

export default AdminSettings;
