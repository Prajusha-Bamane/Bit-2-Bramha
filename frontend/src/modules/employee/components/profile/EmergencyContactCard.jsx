import React, { useState } from 'react';
import { AlertCircle, Edit3, Check, X } from 'lucide-react';

const EmergencyContactCard = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    emergencyName: profile.emergencyContact?.name || '',
    emergencyRelation: profile.emergencyContact?.relation || '',
    emergencyPhone: profile.emergencyContact?.phone || '',
    emergencyAddress: profile.emergencyContact?.address || '',
    secondaryName: profile.secondaryContact?.name || '',
    secondaryRelation: profile.secondaryContact?.relation || '',
    secondaryPhone: profile.secondaryContact?.phone || '',
    secondaryAddress: profile.secondaryContact?.address || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        emergencyContact: {
          name: formData.emergencyName,
          relation: formData.emergencyRelation,
          phone: formData.emergencyPhone,
          address: formData.emergencyAddress
        },
        secondaryContact: {
          name: formData.secondaryName,
          relation: formData.secondaryRelation,
          phone: formData.secondaryPhone,
          address: formData.secondaryAddress
        }
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      emergencyName: profile.emergencyContact?.name || '',
      emergencyRelation: profile.emergencyContact?.relation || '',
      emergencyPhone: profile.emergencyContact?.phone || '',
      emergencyAddress: profile.emergencyContact?.address || '',
      secondaryName: profile.secondaryContact?.name || '',
      secondaryRelation: profile.secondaryContact?.relation || '',
      secondaryPhone: profile.secondaryContact?.phone || '',
      secondaryAddress: profile.secondaryContact?.address || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-rose-500 animate-pulse" />
          <h2 className="text-lg font-bold text-slate-800">Emergency Contacts</h2>
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Primary Contact Form */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Primary Emergency Link</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 text-xs">
                <label htmlFor="emergencyName" className="font-bold text-slate-500">Contact Name</label>
                <input
                  id="emergencyName"
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <label htmlFor="emergencyRelation" className="font-bold text-slate-500">Relationship</label>
                <input
                  id="emergencyRelation"
                  type="text"
                  name="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 text-xs col-span-1 md:col-span-2">
                <label htmlFor="emergencyPhone" className="font-bold text-slate-500">Phone Number</label>
                <input
                  id="emergencyPhone"
                  type="text"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 text-xs col-span-1 md:col-span-2">
                <label htmlFor="emergencyAddress" className="font-bold text-slate-500">Residence Address</label>
                <textarea
                  id="emergencyAddress"
                  name="emergencyAddress"
                  value={formData.emergencyAddress}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Secondary Contact Form */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secondary Emergency Link (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 text-xs">
                <label htmlFor="secondaryName" className="font-bold text-slate-500">Contact Name</label>
                <input
                  id="secondaryName"
                  type="text"
                  name="secondaryName"
                  value={formData.secondaryName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <label htmlFor="secondaryRelation" className="font-bold text-slate-500">Relationship</label>
                <input
                  id="secondaryRelation"
                  type="text"
                  name="secondaryRelation"
                  value={formData.secondaryRelation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1 text-xs col-span-1 md:col-span-2">
                <label htmlFor="secondaryPhone" className="font-bold text-slate-500">Phone Number</label>
                <input
                  id="secondaryPhone"
                  type="text"
                  name="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1 text-xs col-span-1 md:col-span-2">
                <label htmlFor="secondaryAddress" className="font-bold text-slate-500">Residence Address</label>
                <textarea
                  id="secondaryAddress"
                  name="secondaryAddress"
                  value={formData.secondaryAddress}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Primary View */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider border-b border-slate-200/50 pb-2">Primary Link</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 font-semibold">Name</p>
                <p className="text-slate-800 font-extrabold mt-0.5">{profile.emergencyContact?.name || 'Not Provided'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Relationship</p>
                <p className="text-slate-800 font-extrabold mt-0.5">{profile.emergencyContact?.relation || 'Not Provided'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Phone Number</p>
                <p className="text-slate-800 font-extrabold mt-0.5">{profile.emergencyContact?.phone || 'Not Provided'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Address</p>
                <p className="text-slate-800 font-medium mt-0.5">{profile.emergencyContact?.address || 'Not Provided'}</p>
              </div>
            </div>
          </div>

          {/* Secondary View */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/50 pb-2">Secondary Link</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 font-semibold">Name</p>
                <p className="text-slate-800 font-extrabold mt-0.5">{profile.secondaryContact?.name || 'Not Provided'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Relationship</p>
                <p className="text-slate-800 font-extrabold mt-0.5">{profile.secondaryContact?.relation || 'Not Provided'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Phone Number</p>
                <p className="text-slate-800 font-extrabold mt-0.5">{profile.secondaryContact?.phone || 'Not Provided'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Address</p>
                <p className="text-slate-800 font-medium mt-0.5">{profile.secondaryContact?.address || 'Not Provided'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContactCard;
