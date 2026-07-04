import React from 'react';
import { UserPlus, FileUp, CreditCard, Lock } from 'lucide-react';

const QuickActions = ({ onEditProfile, onUploadDocument, onDownloadID, onChangePassword }) => {
  const actions = [
    {
      label: 'Edit Personal Details',
      icon: UserPlus,
      onClick: onEditProfile,
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200/50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Upload Document',
      icon: FileUp,
      onClick: onUploadDocument,
      color: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200/50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Download ID Card',
      icon: CreditCard,
      onClick: onDownloadID,
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200/50',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Change Password',
      icon: Lock,
      onClick: onChangePassword,
      color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200/50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Quick Operations</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-3">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <button
              key={index}
              onClick={act.onClick}
              className={`flex items-center space-x-3 p-3.5 border rounded-xl transition-all duration-200 text-left font-semibold text-xs cursor-pointer ${act.color}`}
            >
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Icon className={`w-4 h-4 ${act.iconColor}`} />
              </div>
              <span className="truncate">{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
