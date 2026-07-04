import React, { useState } from 'react';
import { Clock, Plus, Trash2, Edit2 } from 'lucide-react';

const ShiftTable = ({ shifts, onAdd, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShift, setNewShift] = useState({ name: '', start: '09:00', end: '18:00', breakDur: 60, status: 'Active' });

  const handleModalSubmit = (e) => {
    e.preventDefault();
    
    // Calculate working hours: start vs end
    const startParts = newShift.start.split(':').map(Number);
    const endParts = newShift.end.split(':').map(Number);
    
    let diffMins = (endParts[0] * 60 + endParts[1]) - (startParts[0] * 60 + startParts[1]);
    if (diffMins < 0) diffMins += 24 * 60; // handle overnight shifts
    
    const workingMins = diffMins - Number(newShift.breakDur);
    const workingHrsStr = `${Math.floor(workingMins / 60)}h ${workingMins % 60}m`;

    onAdd({
      id: `shift-${Date.now()}`,
      name: newShift.name,
      startTime: newShift.start,
      endTime: newShift.end,
      breakDuration: `${newShift.breakDur} Mins`,
      workingHours: workingHrsStr,
      status: newShift.status
    });

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this shift?")) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5 select-none">
      
      {/* Header controls */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-655" />
          <div>
            <h2 className="text-sm font-bold text-slate-800">Shift Configurations</h2>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Work schedules desk</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Schedule
        </button>
      </div>

      {/* Shifts Table Grid */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <th className="p-3.5">Shift Name</th>
              <th className="p-3.5 text-center">Start Time</th>
              <th className="p-3.5 text-center">End Time</th>
              <th className="p-3.5 text-center">Break duration</th>
              <th className="p-3.5 text-center">Net Working Hours</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {shifts.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/45 transition">
                <td className="p-3.5 font-bold text-slate-800">{s.name}</td>
                <td className="p-3.5 text-center font-mono font-bold text-slate-700">{s.startTime}</td>
                <td className="p-3.5 text-center font-mono font-bold text-slate-700">{s.endTime}</td>
                <td className="p-3.5 text-center text-slate-500">{s.breakDuration}</td>
                <td className="p-3.5 text-center font-bold text-indigo-650">{s.workingHours}</td>
                <td className="p-3.5 text-center">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                    s.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      : 'bg-rose-50 text-rose-700 border-rose-100'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="p-3.5">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                      title="Delete shift"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Shift Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-sm tracking-tight">Create Shift Schedule</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleModalSubmit}>
              <div className="p-6 space-y-4 text-xs">
                <div className="flex flex-col gap-1">
                  <label htmlFor="shiftName font-bold" className="font-bold text-slate-500">Shift Code Name</label>
                  <input
                    id="shiftName"
                    type="text"
                    value={newShift.name}
                    onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Regular Day Shift"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="shiftStart font-bold" className="font-bold text-slate-500">Start Time</label>
                    <input
                      id="shiftStart"
                      type="time"
                      value={newShift.start}
                      onChange={(e) => setNewShift(prev => ({ ...prev, start: e.target.value }))}
                      className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="shiftEnd font-bold" className="font-bold text-slate-500">End Time</label>
                    <input
                      id="shiftEnd"
                      type="time"
                      value={newShift.end}
                      onChange={(e) => setNewShift(prev => ({ ...prev, end: e.target.value }))}
                      className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="shiftBreak font-bold" className="font-bold text-slate-500">Lunch Break duration (Mins)</label>
                  <input
                    id="shiftBreak"
                    type="number"
                    value={newShift.breakDur}
                    onChange={(e) => setNewShift(prev => ({ ...prev, breakDur: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 font-bold text-xs rounded-xl text-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Create Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShiftTable;
