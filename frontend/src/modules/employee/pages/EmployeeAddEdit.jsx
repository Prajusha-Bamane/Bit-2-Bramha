import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEmployees } from '../data/mockEmployees';
import EmployeeForm from '../components/EmployeeForm';
import { ArrowLeft } from 'lucide-react';

const EmployeeAddEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  // Retrieve current employee details if editing
  const employeeData = useMemo(() => {
    if (!isEdit) return null;
    const emp = mockEmployees.find(e => e.id === id);
    if (!emp) return null;

    // Map database shape to form values
    return {
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      phone: emp.phone || '+91 98765 43210',
      department: emp.department || 'Software Development',
      designation: emp.designation,
      status: emp.status || 'Active',
      joiningDate: emp.joiningDate || new Date().toISOString().split('T')[0],
      role: emp.role || 'Employee',
      emergencyName: emp.emergencyContact?.name || 'Sanjay Iyer',
      emergencyRelation: emp.emergencyContact?.relation || 'Parent',
      emergencyPhone: emp.emergencyContact?.phone || '+91 98334 45500',
    };
  }, [id, isEdit]);

  const handleSubmit = (data) => {
    if (isEdit) {
      // Find and update the mock index in-memory
      const idx = mockEmployees.findIndex(e => e.id === id);
      if (idx !== -1) {
        mockEmployees[idx] = {
          ...mockEmployees[idx],
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          department: data.department,
          designation: data.designation,
          status: data.status,
          joiningDate: data.joiningDate,
          role: data.role,
          emergencyContact: {
            name: data.emergencyName,
            relation: data.emergencyRelation,
            phone: data.emergencyPhone,
          }
        };
        alert(`Successfully updated employee profile: ${data.firstName} ${data.lastName}`);
      }
    } else {
      // Create new mock employee ID
      const newId = `EMP-2026-${(mockEmployees.length + 1).toString().padStart(2, '0')}`;
      
      const newRecord = {
        id: newId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        department: data.department,
        designation: data.designation,
        status: data.status,
        joiningDate: data.joiningDate,
        role: data.role,
        salary: '₹50,000', // Mock baseline
        attendance: '100.0%',
        leaveBalance: 15,
        projects: 1,
        emergencyContact: {
          name: data.emergencyName,
          relation: data.emergencyRelation,
          phone: data.emergencyPhone,
        }
      };

      mockEmployees.push(newRecord);
      alert(`Successfully added new employee profile: ${data.firstName} ${data.lastName} (Assigned ID: ${newId})`);
    }

    navigate('/employees');
  };

  return (
    <div className="space-y-6">
      
      {/* Header back navigate triggers */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/employees')}
          className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-800 transition shadow-sm cursor-pointer"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-850 tracking-tight font-sans">
            {isEdit ? 'Modify Employee Profile' : 'Register New Employee'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isEdit ? `Editing records of Employee ID: ${id}` : 'Fill in the details to enroll a new team member.'}
          </p>
        </div>
      </div>

      <div className="mt-4">
        {isEdit && !employeeData ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm text-center text-slate-400 font-bold">
            Loading profile information...
          </div>
        ) : (
          <EmployeeForm 
            initialValues={employeeData} 
            onSubmit={handleSubmit} 
            isEdit={isEdit} 
          />
        )}
      </div>

    </div>
  );
};

export default EmployeeAddEdit;
