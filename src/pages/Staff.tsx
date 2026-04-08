import React from 'react';
import { Staff as StaffType } from '../types';
import { Badge } from '../components/Badge';
import { Plus, Power, PowerOff, Edit, Trash2 } from 'lucide-react';

interface StaffProps {
  staffList: StaffType[];
  onToggleStatus: (id: string) => void;
  onOpenModal: () => void;
  onEditStaff: (staff: StaffType) => void;
  onDeleteStaff: (id: string) => void;
}

export function Staff({ staffList, onToggleStatus, onOpenModal, onEditStaff, onDeleteStaff }: StaffProps) {
  return (
    <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
      <div className="p-3 px-4 border-b border-border-subtle flex justify-between items-center">
        <span className="text-[13px] font-medium">Staff Directory</span>
        <button onClick={onOpenModal} className="px-2.5 py-1 bg-accent text-white border-none rounded-md text-[11px] cursor-pointer flex items-center gap-1 font-medium hover:bg-accent-dark transition-colors">
          <Plus className="w-[11px] h-[11px]" />
          Onboard Staff
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12px] border-collapse">
          <thead>
            <tr className="bg-surface2 border-b border-border-subtle">
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Name</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Role</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Department</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Hospital (Tenant)</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Account</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff, i) => (
              <tr key={i} className={`border-b border-border-subtle last:border-0 hover:bg-[#fafaf9] ${!staff.isActive ? 'opacity-60' : ''}`}>
                <td className="py-2.5 px-3.5">
                  <div className="font-medium">{staff.name}</div>
                  <div className="text-[10px] text-gray-500">#{staff.id} • {staff.specialization.join(', ')} • {staff.qualifications?.join(', ')}</div>
                </td>
                <td className="py-2.5 px-3.5">{staff.role}</td>
                <td className="py-2.5 px-3.5">{staff.department}</td>
                <td className="py-2.5 px-3.5">{staff.hospital}</td>
                <td className="py-2.5 px-3.5">
                  <Badge status={staff.isActive ? 'admitted' : 'critical'}>
                    {staff.isActive ? 'Active' : 'Disabled'}
                  </Badge>
                </td>
                <td className="py-2.5 px-3.5">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onToggleStatus(staff.id)}
                      className={`p-1.5 rounded-md border transition-colors ${staff.isActive ? 'text-danger border-danger/20 hover:bg-danger/10' : 'text-accent border-accent/20 hover:bg-accent/10'}`}
                      title={staff.isActive ? "Disable Account" : "Enable Account"}
                    >
                      {staff.isActive ? <PowerOff className="w-3.5 h-3.5" /> : <Power className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => onEditStaff(staff)} className="text-accent hover:text-accent-dark p-1.5 rounded-md border border-border-subtle hover:bg-surface2" title="Edit Staff">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onDeleteStaff(staff.id)} className="text-danger hover:text-red-700 p-1.5 rounded-md border border-border-subtle hover:bg-surface2" title="Delete Staff">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
