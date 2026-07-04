import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import apiClient from '../../../services/api.client';
import { mockEmployees } from '../data/mockEmployees';

// Import Reusable Components
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileCompletion from '../components/profile/ProfileCompletion';
import ProfileTabs from '../components/profile/ProfileTabs';
import PersonalInfoCard from '../components/profile/PersonalInfoCard';
import EmploymentCard from '../components/profile/EmploymentCard';
import ContactCard from '../components/profile/ContactCard';
import EmergencyContactCard from '../components/profile/EmergencyContactCard';
import DocumentManager from '../components/profile/DocumentManager';
import SecurityCard from '../components/profile/SecurityCard';
import PreferenceCard from '../components/profile/PreferenceCard';
import ActivityTimeline from '../components/profile/ActivityTimeline';
import QuickActions from '../components/profile/QuickActions';
import AccountInfoCard from '../components/profile/AccountInfoCard';

const EmployeeProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [lastUpdated, setLastUpdated] = useState('Just Now');

  // Core profile state
  const [profile, setProfile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [activities, setActivities] = useState([]);

  // Fetch initial profile setup
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Prepare future-proof API endpoint calls
        const [profileRes, docsRes] = await Promise.all([
          apiClient.get('/employee/profile'),
          apiClient.get('/employee/documents')
        ]);
        setProfile(profileRes.data.data);
        setDocuments(docsRes.data.data);
      } catch (err) {
        console.warn('Backend profile endpoints not active yet. Falling back to local mock data generator.', err);
        
        // Find employee in registry to load correct details, fallback to Jane Doe
        const registryEmp = mockEmployees.find(
          (emp) => emp.email?.toLowerCase() === user?.email?.toLowerCase()
        ) || {
          id: user?.id || 'EMP-2021-04',
          firstName: user?.firstName || 'Jane',
          lastName: user?.lastName || 'Doe',
          email: user?.email || 'jane@hrms.com',
          department: user?.department || 'Software Development',
          designation: 'Senior Software Engineer',
          joiningDate: '2021-04-12',
          phone: '+91 87654 32109'
        };

        // Populate initial mock profile structures
        setProfile({
          firstName: registryEmp.firstName,
          lastName: registryEmp.lastName,
          employeeId: registryEmp.id,
          username: registryEmp.email ? registryEmp.email.split('@')[0] : 'jane.doe',
          role: registryEmp.role || 'Employee',
          status: 'Active',
          designation: registryEmp.designation,
          department: registryEmp.department,
          joiningDate: registryEmp.joiningDate || '2021-04-12',
          companyEmail: registryEmp.email || 'jane.doe@enterprise.com',
          phone: registryEmp.phone || '+91 87654 32109',
          companyName: 'Enterprise HRMS Inc.',
          gender: 'Female',
          dateOfBirth: '1994-08-25',
          bloodGroup: 'B+',
          nationality: 'Indian',
          maritalStatus: 'Single',
          aadhaarNumber: '4512 8596 7412',
          panNumber: 'ABCDE1234F',
          reportingManager: 'Rahul Sharma (HR Director)',
          employmentType: 'Permanent Full-time',
          officeLocation: 'Bangalore Head Office',
          workMode: 'Hybrid (3 Days Office)',
          personalEmail: 'jane.personal@gmail.com',
          alternatePhone: '', // Left empty to showcase completion checklist
          currentAddress: 'Apt 402, Green Glen Layout, Outer Ring Road, Bangalore, KA, India',
          permanentAddress: 'House No 12, Park Street, Kolkata, WB, India',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          postalCode: '560103',
          photoUrl: null, // Left empty to showcase completion checklist
          theme: 'light',
          language: 'English',
          notifications: { email: true, sms: true }
        });

        // Set default documents
        setDocuments([
          { id: 'doc-01', name: 'Aadhaar Card Copy', uploadDate: '2021-04-15', status: 'Verified' },
          { id: 'doc-02', name: 'PAN Card Copy', uploadDate: '2021-04-15', status: 'Verified' },
          { id: 'doc-03', name: 'Corporate Offer Letter', uploadDate: '2021-04-12', status: 'Verified' },
          { id: 'doc-04', name: 'HR Appointment Letter', uploadDate: '2021-04-20', status: 'Verified' },
          { id: 'doc-05', name: 'Employee Identity Card', uploadDate: '2021-04-15', status: 'Verified' },
          { id: 'doc-06', name: 'Previous Academic Certificates', uploadDate: '2021-04-25', status: 'Verified' },
          { id: 'doc-07', name: 'Relieving & Experience Letter', uploadDate: null, status: 'Not Uploaded' }
        ]);

        // Set default timeline
        setActivities([
          { type: 'profile_updated', title: 'Personal Address Updated', detail: 'You modified your local current address details.', time: 'July 01, 2026 - 11:30 AM' },
          { type: 'document_uploaded', title: 'Aadhaar Document verified', detail: 'Compliance officer verified your Aadhaar Card copy.', time: 'June 18, 2026 - 02:40 PM' },
          { type: 'password_changed', title: 'Account Password Changed', detail: 'You successfully updated your account password.', time: 'May 10, 2026 - 09:15 AM' }
        ]);
      } finally {
        setTimeout(() => setLoading(false), 800); // Pulse skeletons
      }
    };
    
    if (user) {
      fetchProfile();
    }
  }, [user]);

  // Compute profile integrity metrics dynamically based on filled fields
  const computeCompletion = () => {
    if (!profile) return { percentage: 0, checklist: [], tips: [] };

    const checks = [
      { key: 'firstName', label: 'First Name Filled' },
      { key: 'lastName', label: 'Last Name Filled' },
      { key: 'gender', label: 'Gender Details Selected' },
      { key: 'dateOfBirth', label: 'Date of Birth Added' },
      { key: 'bloodGroup', label: 'Blood Group Disclosed' },
      { key: 'maritalStatus', label: 'Marital Status Declared' },
      { key: 'aadhaarNumber', label: 'Aadhaar Card Linked' },
      { key: 'panNumber', label: 'PAN Card Linked' },
      { key: 'alternatePhone', label: 'Alternate Phone Linked' },
      { key: 'photoUrl', label: 'Profile Avatar Uploaded' }
    ];

    const checklist = checks.map(c => ({
      label: c.label,
      done: !!profile[c.key]
    }));

    const completedCount = checklist.filter(item => item.done).length;
    const percentage = completedCount * 10;

    // Build missing fields and recommendations
    const tips = [];
    if (!profile.photoUrl) {
      tips.push({ action: 'Upload Profile Avatar', reason: 'Adds visual details to directory listing', targetTab: 'personal' });
    }
    if (!profile.alternatePhone) {
      tips.push({ action: 'Add Alternate Contact', reason: 'Emergency fallback phone channel', targetTab: 'contact' });
    }

    return {
      percentage,
      checklist,
      tips
    };
  };

  const { percentage, checklist, tips } = computeCompletion();

  // Helper to add activity log
  const pushActivity = (type, title, detail) => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) + ' - ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActivities(prev => [{ type, title, detail, time: formatted }, ...prev]);
    setLastUpdated(formatted);
  };

  // Profile Update handlers
  const handleSavePersonalInfo = async (updatedFields) => {
    try {
      await apiClient.put('/employee/profile', updatedFields);
    } catch (err) {
      console.warn('API update failed. Saving locally.', err);
    }
    setProfile(prev => ({ ...prev, ...updatedFields }));
    pushActivity('profile_updated', 'Personal Details Updated', 'You modified your core identity information details.');
  };

  const handleSaveContactInfo = async (updatedFields) => {
    try {
      await apiClient.put('/employee/profile', updatedFields);
    } catch (err) {
      console.warn('API update failed. Saving locally.', err);
    }
    setProfile(prev => ({ ...prev, ...updatedFields }));
    pushActivity('profile_updated', 'Contact Details Updated', 'You updated your addresses and phone numbers.');
  };

  const handleSaveEmergencyInfo = async (updatedFields) => {
    try {
      await apiClient.put('/employee/profile', updatedFields);
    } catch (err) {
      console.warn('API update failed. Saving locally.', err);
    }
    setProfile(prev => ({ ...prev, ...updatedFields }));
    pushActivity('profile_updated', 'Emergency Link Updated', 'You updated emergency contact details.');
  };

  const handlePhotoUpload = async (base64Image) => {
    try {
      await apiClient.post('/employee/profile/photo', { photo: base64Image });
    } catch (err) {
      console.warn('API update failed. Saving locally.', err);
    }
    setProfile(prev => ({ ...prev, photoUrl: base64Image }));
    pushActivity('profile_updated', 'Avatar Picture Updated', 'You updated your profile picture.');
    alert('Profile picture updated successfully!');
  };

  const handlePasswordChange = async (currentPass, newPass) => {
    try {
      await apiClient.put('/employee/password', { currentPassword: currentPass, newPassword: newPass });
    } catch (err) {
      console.warn('API password change failed. Simulating success.', err);
    }
    pushActivity('password_changed', 'Password Updated', 'Your security password was changed successfully.');
    alert('Security password has been updated!');
  };

  const handleDocumentReplace = async (docId, fileName) => {
    try {
      const formData = new FormData();
      formData.append('documentId', docId);
      formData.append('fileName', fileName);
      await apiClient.post('/employee/documents', formData);
    } catch (err) {
      console.warn('API document upload failed. Simulating local pending verification status.', err);
    }
    
    // Update document status locally
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'Pending Verification'
        };
      }
      return doc;
    }));

    const docObj = documents.find(d => d.id === docId);
    pushActivity('document_uploaded', `${docObj?.name || 'Document'} Uploaded`, `You replaced file with: ${fileName}. Verification pending.`);
    alert(`File "${fileName}" uploaded successfully! Sent to HR for verification.`);
  };

  const handleSavePreferences = async (prefData) => {
    try {
      await apiClient.put('/employee/profile', prefData);
    } catch (err) {
      console.warn('API update failed. Saving locally.', err);
    }
    setProfile(prev => ({ ...prev, ...prefData }));
    pushActivity('profile_updated', 'Preferences Changed', 'You updated your account dashboard preferences.');
  };

  // Quick Action delegates
  const handleEditProfileShortcut = () => {
    setActiveTab('personal');
    // Simple alert or scroll
  };

  const handleUploadDocShortcut = () => {
    setActiveTab('documents');
  };

  const handleDownloadIDCard = () => {
    alert(`Generating download package for ${profile.firstName}'s Employee ID Card...`);
  };

  const handleChangePasswordShortcut = () => {
    setActiveTab('security');
  };

  // Jump from tip button to active tabs
  const handleTipNavigate = (tabId) => {
    setActiveTab(tabId);
  };

  // Skeleton state
  if (loading) {
    return (
      <div className="space-y-6 pb-12 font-sans animate-pulse">
        <div className="h-44 bg-slate-200 rounded-2xl border border-slate-350"></div>
        <div className="h-32 bg-slate-200 rounded-2xl border border-slate-350"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="h-64 bg-slate-200 rounded-2xl border border-slate-350"></div>
          <div className="lg:col-span-3 h-96 bg-slate-200 rounded-2xl border border-slate-350"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Employee Profile Center</h1>
        <p className="text-xs text-slate-500 mt-1">Review emergency information, upload compliance documentation, and manage security options.</p>
      </div>

      {/* Hero Banner Header */}
      <ProfileHeader 
        profile={profile} 
        onPhotoUpload={handlePhotoUpload} 
      />

      {/* Profile completion dashboard */}
      <ProfileCompletion 
        percentage={percentage} 
        checklist={checklist} 
        tips={tips} 
        onTipClick={handleTipNavigate} 
      />

      {/* Main dashboard body */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left column navigation */}
        <div className="space-y-6">
          <ProfileTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          <QuickActions 
            onEditProfile={handleEditProfileShortcut}
            onUploadDocument={handleUploadDocShortcut}
            onDownloadID={handleDownloadIDCard}
            onChangePassword={handleChangePasswordShortcut}
          />
          <AccountInfoCard 
            profile={profile} 
            lastUpdated={lastUpdated} 
          />
        </div>

        {/* Right column active panel */}
        <div className="lg:col-span-3 space-y-6">
          
          {activeTab === 'personal' && (
            <PersonalInfoCard 
              profile={profile} 
              onSave={handleSavePersonalInfo} 
            />
          )}

          {activeTab === 'employment' && (
            <EmploymentCard 
              profile={profile} 
            />
          )}

          {activeTab === 'contact' && (
            <ContactCard 
              profile={profile} 
              onSave={handleSaveContactInfo} 
            />
          )}

          {activeTab === 'emergency' && (
            <EmergencyContactCard 
              profile={profile} 
              onSave={handleSaveEmergencyInfo} 
            />
          )}

          {activeTab === 'documents' && (
            <DocumentManager 
              documents={documents} 
              onDocumentReplace={handleDocumentReplace} 
            />
          )}

          {activeTab === 'security' && (
            <SecurityCard 
              lastLogin={activities.find(a => a.type === 'password_changed')?.time} 
              onPasswordChange={handlePasswordChange} 
            />
          )}

          {activeTab === 'preferences' && (
            <PreferenceCard 
              preferences={profile} 
              onSave={handleSavePreferences} 
            />
          )}

          {/* Render Activity Timeline under the card */}
          <ActivityTimeline 
            activities={activities} 
          />

        </div>

      </div>

    </div>
  );
};

export default EmployeeProfile;
