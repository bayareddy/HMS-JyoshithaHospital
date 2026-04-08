import React from 'react';
import { appointments } from '../data';
import { Badge } from '../components/Badge';
import { Plus } from 'lucide-react';

export function Appointments() {
  return (
    <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
      <div className="p-3 px-4 border-b border-border-subtle flex items-center justify-between">
        <span className="text-[13px] font-medium">Appointments — April 4, 2026</span>
        <button className="px-2.5 py-1 bg-accent text-white border-none rounded-md text-[11px] cursor-pointer flex items-center gap-1 font-medium hover:bg-accent-dark transition-colors">
          <Plus className="w-[11px] h-[11px]" />
          New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12px] border-collapse">
          <thead>
            <tr className="bg-surface2 border-b border-border-subtle">
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Time</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Patient</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Doctor</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Type</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Department</th>
              <th className="py-2.5 px-3.5 font-medium text-[11px] text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt, i) => (
              <tr key={i} className="border-b border-border-subtle last:border-0 hover:bg-[#fafaf9]">
                <td className={`py-2.5 px-3.5 font-medium ${apt.status === 'scheduled' ? 'text-warning' : 'text-accent'}`}>
                  {apt.time}
                </td>
                <td className="py-2.5 px-3.5">{apt.patient}</td>
                <td className="py-2.5 px-3.5">{apt.doctor}</td>
                <td className="py-2.5 px-3.5">{apt.type}</td>
                <td className="py-2.5 px-3.5">{apt.department}</td>
                <td className="py-2.5 px-3.5">
                  <Badge status={apt.status}>
                    {apt.status === 'admitted' ? 'Confirmed' : apt.status === 'stable' ? 'In Progress' : 'Upcoming'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
