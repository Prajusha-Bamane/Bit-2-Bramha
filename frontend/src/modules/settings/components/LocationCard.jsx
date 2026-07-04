import React, { useState } from 'react';
import { MapPin, Plus, Building } from 'lucide-react';

const LocationCard = ({ locations, onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLoc, setNewLoc] = useState({ name: '', city: '', state: '', country: '', employees: 0 });

  const handleModalSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...newLoc,
      id: `loc-${Date.now()}`
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5 select-none font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-sm font-bold text-slate-800">Operational Work Locations</h2>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Offices & headquarter branches</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-755 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Building className="w-5 h-5" />
                </div>
                <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-50 text-slate-500 border border-slate-100">
                  {loc.employees} Employees
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">{loc.name}</h4>
                <p className="text-[10px] text-slate-500 font-semibold mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {loc.city}, {loc.state}, {loc.country}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Location Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-sm tracking-tight">Add Work Office Location</h3>
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
                  <label htmlFor="locName font-bold" className="font-bold text-slate-500">Office Name</label>
                  <input
                    id="locName"
                    type="text"
                    value={newLoc.name}
                    onChange={(e) => setNewLoc(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Noida Hub office"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="locCity font-bold" className="font-bold text-slate-500">City</label>
                    <input
                      id="locCity"
                      type="text"
                      value={newLoc.city}
                      onChange={(e) => setNewLoc(prev => ({ ...prev, city: e.target.value }))}
                      className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="locState font-bold" className="font-bold text-slate-500">State / Territory</label>
                    <input
                      id="locState"
                      type="text"
                      value={newLoc.state}
                      onChange={(e) => setNewLoc(prev => ({ ...prev, state: e.target.value }))}
                      className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="locCountry font-bold" className="font-bold text-slate-500">Country</label>
                    <input
                      id="locCountry"
                      type="text"
                      value={newLoc.country}
                      onChange={(e) => setNewLoc(prev => ({ ...prev, country: e.target.value }))}
                      className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="locEmployees font-bold" className="font-bold text-slate-500">Assigned Employees</label>
                    <input
                      id="locEmployees"
                      type="number"
                      value={newLoc.employees}
                      onChange={(e) => setNewLoc(prev => ({ ...prev, employees: Number(e.target.value) }))}
                      className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
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
                  Create Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LocationCard;
