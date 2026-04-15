import React, { useState } from 'react';
import { Patient } from '../types';
import { Badge } from '../components/Badge';

export function Patients({ patients }: { patients: Patient[] }) {
  const [filter, setFilter] = useState('all');

  const filteredPatients = filter === 'all' 
    ? patients 
    : patients.filter(p => p.status === filter);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'admitted', label: 'Admitted' },
    { id: 'critical', label: 'Critical' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'discharged', label: 'Discharged' },
  ];

  return (
    <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
      {/* Horizontal scrollable filter bar */}
      <div className="flex gap-1.5 sm:gap-2 p-2 sm:p-2.5 px-3 sm:px-4 border-b border-border-subtle items-center overflow-x-auto">
        <span className="text-[11px] text-gray-500 shrink-0">Filter:</span>
        <div className="flex gap-1.5 sm:gap-2">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] border transition-colors whitespace-nowrap touch-manipulation ${
                filter === f.id 
                  ? 'bg-accent-light text-accent-dark border-accent' 
                  : 'bg-surface text-gray-500 border-border-subtle hover:bg-surface2'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Responsive table with horizontal scroll */}
      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full text-left text-[12px] border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface2 border-b border-border-subtle">
              <th className="py-2.5 px-3 sm:px-3.5 font-medium text-[11px] text-gray-500">Patient</th>
              <th className="py-2.5 px-3 sm:px-3.5 font-medium text-[11px] text-gray-500">Age / Gender</th>
              <th className="py-2.5 px-3 sm:px-3.5 font-medium text-[11px] text-gray-500 hide-mobile">Ward</th>
              <th className="py-2.5 px-3 sm:px-3.5 font-medium text-[11px] text-gray-500 hide-mobile">Doctor</th>
              <th className="py-2.5 px-3 sm:px-3.5 font-medium text-[11px] text-gray-500 hide-mobile">Diagnosis</th>
              <th className="py-2.5 px-3 sm:px-3.5 font-medium text-[11px] text-gray-500 hide-mobile">Blood</th>
              <th className="py-2.5 px-3 sm:px-3.5 font-medium text-[11px] text-gray-500">Status</th>
              <th className="py-2.5 px-3 sm:px-3.5 font-medium text-[11px] text-gray-500 hide-mobile">Admitted</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p, i) => (
              <tr key={i} className="border-b border-border-subtle last:border-0 hover:bg-[#fafaf9]">
                <td className="py-2.5 px-3 sm:px-3.5">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-[10px] text-gray-500">#{p.id}</div>
                </td>
                <td className="py-2.5 px-3 sm:px-3.5">{p.age} / {p.gender}</td>
                <td className="py-2.5 px-3 sm:px-3.5 hide-mobile">{p.ward}</td>
                <td className="py-2.5 px-3 sm:px-3.5 hide-mobile">{p.doctor}</td>
                <td className="py-2.5 px-3 sm:px-3.5 hide-mobile">{p.diagnosis}</td>
                <td className="py-2.5 px-3 sm:px-3.5 hide-mobile">{p.blood}</td>
                <td className="py-2.5 px-3 sm:px-3.5">
                  <Badge status={p.status}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</Badge>
                </td>
                <td className="py-2.5 px-3 sm:px-3.5 hide-mobile">{p.date}</td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500 text-[12px]">
                  No patients found matching the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
