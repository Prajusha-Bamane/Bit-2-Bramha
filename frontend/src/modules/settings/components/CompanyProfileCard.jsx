import React, { useState } from 'react';
import { Building2, Save, Upload } from 'lucide-react';

const CompanyProfileCard = ({ profile, onSave }) => {
  const [logo, setLogo] = useState(profile?.companyLogo || null);
  const [companyName, setCompanyName] = useState(profile?.companyName || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [gstNumber, setGstNumber] = useState(profile?.gstNumber || '');
  const [regNumber, setRegNumber] = useState(profile?.regNumber || '');
  const [hrContact, setHrContact] = useState(profile?.hrContact || '');
  const [supportContact, setSupportContact] = useState(profile?.supportContact || '');

  // Socials
  const [socials, setSocials] = useState({
    linkedin: profile?.socialLinks?.linkedin || '',
    twitter: profile?.socialLinks?.twitter || '',
    github: profile?.socialLinks?.github || ''
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialChange = (key, val) => {
    setSocials(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        companyLogo: logo,
        companyName,
        address,
        email,
        phone,
        website,
        gstNumber,
        regNumber,
        hrContact,
        supportContact,
        socialLinks: socials
      });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 select-none">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
        <Building2 className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-800">Company Organization Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Logo and Name row */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-slate-500">Company Logo</span>
            <label className="relative w-28 h-28 bg-slate-50 border-2 border-dashed border-slate-250 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/70 transition overflow-hidden group">
              {logo ? (
                <img src={logo} alt="Company Logo" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-2 text-slate-400">
                  <Upload className="w-6 h-6 mx-auto mb-1 group-hover:scale-105 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-wider block">Upload Logo</span>
                </div>
              )}
              <input type="file" onChange={handleLogoUpload} className="hidden" accept="image/*" />
            </label>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex flex-col gap-1">
              <label htmlFor="website font-bold" className="font-bold text-slate-500">Website Address</label>
              <input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email font-bold" className="font-bold text-slate-500">Corporate Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone font-bold" className="font-bold text-slate-500">Phone Number</label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Core fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div className="flex flex-col gap-1">
            <label htmlFor="gstNumber font-bold" className="font-bold text-slate-500">GST Registration Number</label>
            <input
              id="gstNumber"
              type="text"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="regNumber font-bold" className="font-bold text-slate-500">CIN (Company Reg Number)</label>
            <input
              id="regNumber"
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="hrContact font-bold" className="font-bold text-slate-500">Primary HR Contact Coordinator</label>
            <input
              id="hrContact"
              type="text"
              value={hrContact}
              onChange={(e) => setHrContact(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="supportContact font-bold" className="font-bold text-slate-500">Support Desk Inbox</label>
            <input
              id="supportContact"
              type="email"
              value={supportContact}
              onChange={(e) => setSupportContact(e.target.value)}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="address font-bold" className="font-bold text-slate-500">Registered Office Headquarters Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 resize-none"
              required
            />
          </div>
        </div>

        {/* Social channels */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h3 className="font-bold text-slate-550 block">Corporate Social Handles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="linkedin font-bold" className="font-bold text-slate-500">LinkedIn Profile Link</label>
              <input
                id="linkedin"
                type="url"
                value={socials.linkedin}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="twitter font-bold" className="font-bold text-slate-500">Twitter Link</label>
              <input
                id="twitter"
                type="url"
                value={socials.twitter}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://twitter.com/..."
                className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="github font-bold" className="font-bold text-slate-500">GitHub Organization Link</label>
              <input
                id="github"
                type="url"
                value={socials.github}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                placeholder="https://github.com/..."
                className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold rounded-xl shadow-md shadow-indigo-500/20 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Profile Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfileCard;
