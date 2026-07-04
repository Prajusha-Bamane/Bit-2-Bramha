import React from 'react';
import SettingsSidebar from './SettingsSidebar';

const SettingsLayout = ({ activeItem, onItemSelect, children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start font-sans">
      {/* 1. Left Sidebar menu */}
      <SettingsSidebar 
        activeItem={activeItem} 
        onItemSelect={onItemSelect} 
      />

      {/* 2. Right Detail display */}
      <main className="flex-1 w-full min-w-0">
        {children}
      </main>
    </div>
  );
};

export default SettingsLayout;
