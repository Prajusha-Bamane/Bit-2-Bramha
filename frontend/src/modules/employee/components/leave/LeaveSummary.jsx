import React from 'react';
import { CalendarRange, CalendarClock, BadgeCheck, Clock3, ShieldAlert, TrendingUp, Sparkles, Plane, Briefcase } from 'lucide-react';

const cards = [
  { title: 'Total Leave Balance', value: '24 Days', subtitle: 'Available across all leave types', icon: CalendarRange, tint: 'from-emerald-500 to-teal-500' },
  { title: 'Used Leave', value: '12 Days', subtitle: 'This year consumed', icon: Clock3, tint: 'from-amber-500 to-orange-500' },
  { title: 'Remaining Leave', value: '12 Days', subtitle: 'Ready to use', icon: Sparkles, tint: 'from-sky-500 to-indigo-500' },
  { title: 'Pending Approval', value: '6', subtitle: 'Awaiting manager review', icon: CalendarClock, tint: 'from-violet-500 to-fuchsia-500' },
  { title: 'Approved Requests', value: '31', subtitle: 'Approved successfully', icon: BadgeCheck, tint: 'from-emerald-500 to-green-500' },
  { title: 'Rejected Requests', value: '3', subtitle: 'Needs follow up', icon: ShieldAlert, tint: 'from-rose-500 to-red-500' },
  { title: 'Upcoming Leave', value: '3 days', subtitle: 'Next planned time-off', icon: Plane, tint: 'from-cyan-500 to-blue-500' },
  { title: 'This Month Leave', value: '5 Days', subtitle: 'Current month usage', icon: Briefcase, tint: 'from-slate-700 to-slate-500' },
];

const LeaveSummary = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className={`inline-flex rounded-2xl bg-gradient-to-br ${card.tint} p-3 text-white`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-700">{card.title}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
            <p className="mt-1 flex items-center text-sm text-slate-500">
              <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />{card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveSummary;
