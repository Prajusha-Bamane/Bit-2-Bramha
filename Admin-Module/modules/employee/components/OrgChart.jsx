import React from 'react';
import { Building, ShieldAlert, Award, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrgChartNode = ({ name, role, dept, initials, color, id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div 
        onClick={() => id && navigate(`/employees/${id}`)}
        className={`bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/80 hover:-translate-y-0.5 transition-all duration-200 w-52 flex flex-col items-center text-center cursor-pointer relative group`}
      >
        <div className={`w-11 h-11 rounded-full ${color} flex items-center justify-center font-bold text-xs mb-2 shadow-sm`}>
          {initials}
        </div>
        <h4 className="text-xs font-extrabold text-slate-800 leading-tight group-hover:text-primary transition-colors">
          {name}
        </h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-wide">{role}</p>
        <span className="mt-2 text-[9px] font-bold px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-500 rounded-md">
          {dept}
        </span>
      </div>
    </div>
  );
};

const OrgChart = () => {
  return (
    <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-200/80 shadow-inner overflow-x-auto min-w-full">
      <div className="flex flex-col items-center min-w-[700px] py-4">
        
        {/* CEO LEVEL */}
        <OrgChartNode 
          id="a59cf837-73d8-4f24-9b21-4fa3e46c750b"
          name="System Administrator" 
          role="Chief Executive Officer" 
          dept="Administration" 
          initials="SA" 
          color="bg-slate-900 text-white" 
        />
        
        {/* Connection Line CEO to Heads */}
        <div className="h-6 w-0.5 bg-slate-300"></div>
        <div className="w-[500px] h-0.5 bg-slate-300"></div>
        
        <div className="flex justify-between w-[640px] pt-1">
          <div className="h-6 w-0.5 bg-slate-300 self-start ml-24"></div>
          <div className="h-6 w-0.5 bg-slate-300 self-end mr-24"></div>
        </div>

        {/* HEADS LEVEL */}
        <div className="flex justify-between w-[700px] mt-1">
          {/* Head 1: HR */}
          <div className="flex flex-col items-center">
            <OrgChartNode 
              id="EMP-2020-01"
              name="Rahul Sharma" 
              role="HR Director" 
              dept="Human Resources" 
              initials="RS" 
              color="bg-indigo-100 text-indigo-700" 
            />
            
            <div className="h-6 w-0.5 bg-slate-300"></div>
            
            {/* Managers under HR */}
            <OrgChartNode 
              id="EMP-2024-06"
              name="Anjali Sharma" 
              role="HR Lead Executive" 
              dept="Human Resources" 
              initials="AS" 
              color="bg-blue-100 text-blue-700" 
            />
          </div>

          {/* Head 2: Engineering */}
          <div className="flex flex-col items-center">
            <OrgChartNode 
              id="EMP-2022-08"
              name="Amit Kumar" 
              role="Technical Architect" 
              dept="Software Dev" 
              initials="AK" 
              color="bg-emerald-100 text-emerald-700" 
            />
            
            <div className="h-6 w-0.5 bg-slate-300"></div>
            <div className="w-[180px] h-0.5 bg-slate-300"></div>
            
            <div className="flex justify-between w-[200px] pt-1">
              <div className="h-6 w-0.5 bg-slate-300 self-start ml-8"></div>
              <div className="h-6 w-0.5 bg-slate-300 self-end mr-8"></div>
            </div>

            {/* Tech Managers */}
            <div className="flex justify-between gap-6">
              <OrgChartNode 
                id="EMP-2023-02"
                name="Ramesh Patel" 
                role="Senior Web Dev" 
                dept="Software Dev" 
                initials="RP" 
                color="bg-amber-100 text-amber-700" 
              />
              <OrgChartNode 
                id="EMP-2023-05"
                name="Arjun Dave" 
                role="DevOps Lead" 
                dept="Software Dev" 
                initials="AD" 
                color="bg-purple-100 text-purple-700" 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrgChart;
