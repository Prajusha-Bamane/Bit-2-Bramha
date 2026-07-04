import React from 'react';

const NotificationBadge = ({ count }) => {
  if (!count || count <= 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white select-none animate-pulse">
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default NotificationBadge;
