import React, { useState } from 'react';
import { User, Edit3, Check, X } from 'lucide-react';

const PersonalInfoCard = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    gender: profile.gender || '',
    dateOfBirth: profile.dateOfBirth || '',
    bloodGroup: profile.bloodGroup || '',
    nationality: profile.nationality || '',
    maritalStatus: profile.maritalStatus || '',
    aadhaarNumber: profile.aadhaarNumber || '',
    panNumber: profile.panNumber || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      gender: profile.gender || '',
      dateOfBirth: profile.dateOfBirth || '',
      bloodGroup: profile.bloodGroup || '',
      nationality: profile.nationality || '',
      maritalStatus: profile.maritalStatus || '',
      aadhaarNumber: profile.aadhaarNumber || '',
      panNumber: profile.panNumber || ''
    });
    setIsEditing(false);
  };

  // Masking helpers
  const maskAadhaar = (num) => {
    if (!num) return 'Not Provided';
    const cleaned = num.replace(/\s/g, '');
    if (cleaned.length < 12) return num;
    return `•••• •••• ${cleaned.slice(-4)}`;
  };

  const maskPAN = (num) => {
    if (!num) return 'Not Provided';
    if (num.length < 10) return num;
    return `••••••${num.slice(-4).toUpperCase()}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Personal Information</h2>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl border border-slate-200 transition cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Info
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="firstName" className="font-bold text-slate-500">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {/* Last Name */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="lastName" className="font-bold text-slate-500">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {/* Gender */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="gender" className="font-bold text-slate-500">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Date of Birth */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="dateOfBirth" className="font-bold text-slate-500">Date of Birth</label>
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Blood Group */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="bloodGroup" className="font-bold text-slate-500">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            {/* Nationality */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="nationality" className="font-bold text-slate-500">Nationality</label>
              <input
                id="nationality"
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Marital Status */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="maritalStatus" className="font-bold text-slate-500">Marital Status</label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            {/* Aadhaar Number */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="aadhaarNumber" className="font-bold text-slate-500">Aadhaar Number</label>
              <input
                id="aadhaarNumber"
                type="text"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                placeholder="4512 8596 7412"
                maxLength="14"
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* PAN Number */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="panNumber" className="font-bold text-slate-500">PAN Number</label>
              <input
                id="panNumber"
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                placeholder="ABCDE1234F"
                maxLength="10"
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-xs">
          <div>
            <p className="text-slate-400 font-bold">First Name</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.firstName}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Last Name</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.lastName}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Gender</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.gender || 'Not Specified'}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Date of Birth</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.dateOfBirth || 'Not Specified'}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Blood Group</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.bloodGroup || 'Not Specified'}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Nationality</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.nationality || 'Not Specified'}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Marital Status</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.maritalStatus || 'Not Specified'}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Aadhaar Card</p>
            <p className="text-slate-850 font-mono font-bold mt-1">{maskAadhaar(profile.aadhaarNumber)}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">PAN Card</p>
            <p className="text-slate-850 font-mono font-bold mt-1">{maskPAN(profile.panNumber)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoCard;
