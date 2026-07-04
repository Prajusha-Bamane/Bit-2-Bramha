import React, { useState } from 'react';
import { Mail, Edit2, Eye, Save, Code } from 'lucide-react';

const EmailTemplateCard = ({ templates, onSave }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || '');
  const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'edit'

  const activeTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];

  // Forms edit fields
  const [subject, setSubject] = useState(activeTemplate?.subject || '');
  const [body, setBody] = useState(activeTemplate?.body || '');

  // Reset fields when active template shifts
  const handleTemplateSelect = (id) => {
    const t = templates.find(temp => temp.id === id);
    setSelectedTemplateId(id);
    if (t) {
      setSubject(t.subject);
      setBody(t.body);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...activeTemplate,
        subject,
        body
      });
    }
    alert('Email Template template configurations saved!');
  };

  // Mock template parser for visual display previewing values
  const getRenderedPreview = () => {
    if (!activeTemplate) return '';
    let parsedSubject = subject;
    let parsedBody = body;

    const mockReplacements = {
      employee_name: 'Rahul Sharma',
      company_name: 'AURA Solutions Pvt. Ltd.',
      designation: 'Senior Architect',
      department: 'Engineering',
      joining_date: 'July 15, 2026',
      username: 'rahul.sharma',
      temp_password: 'AURA#SecurePass99',
      leave_type: 'Paid Sick Leave',
      start_date: 'July 10, 2026',
      end_date: 'July 12, 2026',
      days: '3',
      manager_name: 'Priya Nair (HR Manager)',
      month: 'June',
      year: '2026',
      date: 'July 10, 2026',
      time: '11:00 AM IST',
      meeting_url: 'https://teams.microsoft.com/aura-townhall',
      reset_code: '482-901',
      device: 'Chrome / macOS Sonoma',
      timestamp: 'Today at 02:40 PM',
      ip_address: '103.45.88.102',
      document_name: 'Aadhaar Card Copy',
      deadline: 'July 31, 2026'
    };

    Object.entries(mockReplacements).forEach(([key, val]) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      parsedSubject = parsedSubject.replace(regex, val);
      parsedBody = parsedBody.replace(regex, val);
    });

    return {
      subject: parsedSubject,
      body: parsedBody
    };
  };

  const preview = getRenderedPreview();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 select-none font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
        <Mail className="w-5 h-5 text-indigo-650" />
        <div>
          <h2 className="text-sm font-bold text-slate-800">Email Alerts Templates</h2>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Communication broadcasts desk</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side: Templates List Menu */}
        <div className="w-full lg:w-1/3 space-y-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">
            System templates
          </span>
          <div className="space-y-1">
            {templates.map((temp) => (
              <button
                key={temp.id}
                onClick={() => handleTemplateSelect(temp.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer text-left border ${
                  selectedTemplateId === temp.id
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm'
                    : 'bg-slate-50/50 border-slate-100 hover:bg-slate-100 text-slate-650 hover:text-slate-850'
                }`}
              >
                <span className="truncate">{temp.name}</span>
                <Mail className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Template Editor or Live Preview */}
        <div className="flex-1 w-full border border-slate-150 rounded-2xl overflow-hidden flex flex-col bg-slate-50/45 min-h-[400px]">
          {/* Header controls inside card detail box */}
          <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
            <h4 className="font-extrabold text-xs tracking-tight">{activeTemplate?.name}</h4>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                  viewMode === 'preview' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Live Preview
              </button>
              <button
                onClick={() => setViewMode('edit')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                  viewMode === 'edit' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Template
              </button>
            </div>
          </div>

          {/* Form edit body or preview frame */}
          <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
            {viewMode === 'edit' ? (
              <div className="space-y-4 text-xs flex-1 flex flex-col">
                <div className="flex flex-col gap-1">
                  <label htmlFor="subject font-bold" className="font-bold text-slate-550">Subject Line</label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-350 rounded-xl bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label htmlFor="body font-bold" className="font-bold text-slate-550">Email Body Message</label>
                  <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 border border-slate-350 rounded-xl bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none font-mono text-[11px] resize-none flex-1"
                    required
                  />
                </div>
                
                {/* Variable tags reference bar */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Supported Parameter Placeholders
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTemplate?.variables?.map((v) => (
                      <span key={v} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono">
                        <Code className="w-2.5 h-2.5" />
                        {"{{"}{v}{"}}"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 bg-white border border-slate-200 rounded-xl p-5 shadow-inner space-y-3.5">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subject:</span>
                  <p className="font-extrabold text-slate-850 text-xs mt-0.5">{preview.subject}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Body:</span>
                  <pre className="text-slate-650 text-xs font-sans whitespace-pre-wrap leading-relaxed">
                    {preview.body}
                  </pre>
                </div>
              </div>
            )}

            {/* Save Template Button */}
            {viewMode === 'edit' && (
              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Email Template
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default EmailTemplateCard;
