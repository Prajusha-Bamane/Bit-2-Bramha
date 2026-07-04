import React from 'react';

const SettingsCard = ({ title, description, children, icon: Icon }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-4 font-sans">
      {title && (
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm leading-snug">{title}</h3>
            {description && <p className="text-[10px] text-slate-400 font-semibold">{description}</p>}
          </div>
        </div>
      )}
      <div className="text-xs">{children}</div>
    </div>
  );
};

export default SettingsCard;
export { SettingsCard };
