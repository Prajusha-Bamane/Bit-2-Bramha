import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';

const timezones = ['Asia/Kolkata (GMT+05:30)', 'Asia/Singapore (GMT+08:00)', 'Europe/London (GMT+00:00)', 'America/New_York (GMT-05:00)'];
const currencies = ['INR (₹) - Indian Rupee', 'SGD ($) - Singapore Dollar', 'GBP (£) - British Pound', 'USD ($) - US Dollar'];
const dateFormats = ['YYYY-MM-DD', 'DD-MM-YYYY', 'MM/DD/YYYY'];
const languages = ['English (United States)', 'Hindi (India)', 'Spanish (Europe)', 'French (Europe)'];
const weekDaysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const GeneralSettingsCard = ({ config, onSave }) => {
  const [companyName, setCompanyName] = useState(config?.companyName || '');
  const [appName, setAppName] = useState(config?.appName || '');
  const [timezone, setTimezone] = useState(config?.timezone || timezones[0]);
  const [currency, setCurrency] = useState(config?.currency || currencies[0]);
  const [dateFormat, setDateFormat] = useState(config?.dateFormat || dateFormats[0]);
  const [language, setLanguage] = useState(config?.language || languages[0]);
  const [workingDays, setWorkingDays] = useState(config?.workingDays || []);
  const [workingHours, setWorkingHours] = useState(config?.workingHours || { start: '09:00', end: '18:00' });

  const handleDayToggle = (day) => {
    setWorkingDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        companyName,
        appName,
        timezone,
        currency,
        dateFormat,
        language,
        workingDays,
        workingHours
      });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 select-none">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
        <Settings className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-800">General Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="companyName font-bold" className="font-bold text-slate-500">Corporate Name</label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          {/* App Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="appName font-bold" className="font-bold text-slate-500">Application Banner Name</label>
            <input
              id="appName"
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Timezone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="timezone font-bold" className="font-bold text-slate-500">Standard Timezone</label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            >
              {timezones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>

          {/* Currency */}
          <div className="flex flex-col gap-1">
            <label htmlFor="currency font-bold" className="font-bold text-slate-500">Local Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            >
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Date Format */}
          <div className="flex flex-col gap-1">
            <label htmlFor="dateFormat font-bold" className="font-bold text-slate-500">Date Format</label>
            <select
              id="dateFormat"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            >
              {dateFormats.map(df => <option key={df} value={df}>{df}</option>)}
            </select>
          </div>

          {/* Language */}
          <div className="flex flex-col gap-1">
            <label htmlFor="language font-bold" className="font-bold text-slate-500">System Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Shift Hours */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-500">Shift Start Hour</label>
            <input
              type="time"
              value={workingHours.start}
              onChange={(e) => setWorkingHours(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-500">Shift End Hour</label>
            <input
              type="time"
              value={workingHours.end}
              onChange={(e) => setWorkingHours(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Working Days */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="font-bold text-slate-550 block">Operational Working Days</label>
          <div className="flex flex-wrap gap-2">
            {weekDaysList.map((day) => {
              const isSelected = workingDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`px-3 py-2 rounded-xl border text-[10px] font-bold uppercase transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-sm'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold rounded-xl shadow-md shadow-indigo-500/20 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save General Config
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettingsCard;
export { weekDaysList };
