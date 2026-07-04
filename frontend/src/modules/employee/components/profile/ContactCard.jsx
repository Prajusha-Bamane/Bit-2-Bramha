import React, { useState } from 'react';
import { Phone, Edit3, Check, X } from 'lucide-react';

const ContactCard = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    personalEmail: profile.personalEmail || profile.email || '',
    phone: profile.phone || '',
    alternatePhone: profile.alternatePhone || '',
    currentAddress: profile.currentAddress || '',
    permanentAddress: profile.permanentAddress || '',
    city: profile.city || '',
    state: profile.state || '',
    country: profile.country || '',
    postalCode: profile.postalCode || ''
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
      personalEmail: profile.personalEmail || profile.email || '',
      phone: profile.phone || '',
      alternatePhone: profile.alternatePhone || '',
      currentAddress: profile.currentAddress || '',
      permanentAddress: profile.permanentAddress || '',
      city: profile.city || '',
      state: profile.state || '',
      country: profile.country || '',
      postalCode: profile.postalCode || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Contact Information</h2>
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
            {/* Personal Email */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="personalEmail" className="font-bold text-slate-500">Personal Email</label>
              <input
                id="personalEmail"
                type="email"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {/* Phone Number */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="phone" className="font-bold text-slate-500">Phone Number</label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {/* Alternate Phone */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="alternatePhone" className="font-bold text-slate-500">Alternate Phone</label>
              <input
                id="alternatePhone"
                type="text"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* City */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="city" className="font-bold text-slate-500">City</label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* State */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="state" className="font-bold text-slate-500">State</label>
              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Country */}
            <div className="flex flex-col gap-1 text-xs">
              <label htmlFor="country" className="font-bold text-slate-500">Country</label>
              <input
                id="country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Postal Code */}
            <div className="flex flex-col gap-1 text-xs col-span-1 md:col-span-2">
              <label htmlFor="postalCode" className="font-bold text-slate-500">Postal Code (ZIP)</label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Current Address */}
            <div className="flex flex-col gap-1 text-xs col-span-1 md:col-span-2">
              <label htmlFor="currentAddress" className="font-bold text-slate-500">Current Residence Address</label>
              <textarea
                id="currentAddress"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Permanent Address */}
            <div className="flex flex-col gap-1 text-xs col-span-1 md:col-span-2">
              <label htmlFor="permanentAddress" className="font-bold text-slate-500">Permanent Address</label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-xs">
          <div>
            <p className="text-slate-400 font-bold">Personal Email</p>
            <p className="text-slate-800 font-semibold mt-1 break-all">{profile.personalEmail || profile.email}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Phone Number</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.phone}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Alternate Phone</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.alternatePhone || 'Not Provided'}</p>
          </div>
          <div className="col-span-2 md:col-span-3">
            <p className="text-slate-400 font-bold">Current Address</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.currentAddress || 'Not Provided'}</p>
          </div>
          <div className="col-span-2 md:col-span-3">
            <p className="text-slate-400 font-bold">Permanent Address</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.permanentAddress || 'Not Provided'}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">City</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.city || 'Not Provided'}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">State</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.state || 'Not Provided'}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Country</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.country || 'Not Provided'}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Postal Code</p>
            <p className="text-slate-800 font-semibold mt-1">{profile.postalCode || 'Not Provided'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
