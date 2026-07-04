import React, { useRef } from 'react';
import { Camera, Mail, Phone, Calendar, Building, Sparkles } from 'lucide-react';
import StatusBadge from '../leave/StatusBadge'; // reuse status badge styles or render custom inline

const ProfileHeader = ({ profile, onPhotoUpload }) => {
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onPhotoUpload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoUpload(reader.result); // Pass base64 data to parent state
      };
      reader.readAsDataURL(file);
    }
  };

  const name = `${profile.firstName} ${profile.lastName}`;
  const initials = `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}`;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden text-white mb-8">
      {/* Decorative Blur Circle */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 relative z-10">
        
        {/* Avatar block with hover upload overlay */}
        <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
          {profile.photoUrl ? (
            <img 
              src={profile.photoUrl} 
              alt={name} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-indigo-500/30 object-cover shadow-inner transition-transform group-hover:scale-105" 
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-800 border-4 border-indigo-500/30 flex items-center justify-center font-bold text-3xl md:text-4xl text-indigo-300 shadow-inner transition-transform group-hover:scale-105">
              {initials}
            </div>
          )}
          
          <button 
            type="button"
            className="absolute inset-0 bg-slate-900/60 rounded-full flex flex-col items-center justify-center text-[10px] md:text-xs font-bold text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Upload profile photo"
          >
            <Camera className="w-5 h-5 mb-1 text-white" />
            Upload Photo
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Info detail grid */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{name}</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {profile.status || 'Active'}
            </span>
          </div>

          <p className="text-sm text-indigo-300 font-bold uppercase tracking-wider">
            {profile.designation} — {profile.department}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span>Employee ID: <strong className="text-white">{profile.employeeId}</strong></span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Building className="w-4 h-4 text-slate-400" />
              <span>{profile.companyName || 'Enterprise HRMS Inc.'}</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Joined: {profile.joiningDate}</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <a href={`mailto:${profile.companyEmail}`} className="hover:text-white transition">{profile.companyEmail}</a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <a href={`tel:${profile.phone}`} className="hover:text-white transition">{profile.phone}</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileHeader;
