import React from 'react';
import { Department, Staff as StaffType } from '../types';
import { Plus, Users } from 'lucide-react';

interface DepartmentsProps {
  departments: Department[];
  staffList: StaffType[];
  onOpenModal: () => void;
}

export function Departments({ departments, staffList, onOpenModal }: DepartmentsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[14px] font-medium">Department Management</h3>
        <button onClick={onOpenModal} className="px-3 py-1.5 bg-accent text-white border-none rounded-md text-[11px] cursor-pointer flex items-center gap-1.5 font-medium hover:bg-accent-dark transition-colors">
          <Plus className="w-[13px] h-[13px]" />
          New Department
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {departments.map((dept, i) => {
          const deptStaff = staffList.filter(s => s.department === dept.name && s.isActive);
          return (
            <div key={i} className="bg-surface border border-border-subtle rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[14px] font-medium">{dept.name}</div>
                <div className="bg-surface2 text-gray-600 text-[10px] px-2 py-0.5 rounded-full border border-border-subtle">
                  {dept.id}
                </div>
              </div>
              <div className="text-[11px] text-gray-500 mb-4 flex-1">{dept.description}</div>
              
              <div className="border-t border-border-subtle pt-3 mt-auto">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-500">Head of Dept:</span>
                  <span className="font-medium">{dept.head}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] mt-1.5">
                  <span className="text-gray-500">Assigned Staff:</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-3 h-3 text-accent" /> {deptStaff.length}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
