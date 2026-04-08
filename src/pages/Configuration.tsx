import React, { useState } from 'react';
import { Department, Role, Tenant, Qualification, Availability, Shift } from '../types';
import { Building2, Shield, MapPin, Plus, Edit, Trash2, X, GraduationCap, Clock, Calendar } from 'lucide-react';

interface ConfigurationProps {
  departments: Department[];
  roles: Role[];
  tenants: Tenant[];
  qualifications: Qualification[];
  availabilities: Availability[];
  shifts: Shift[];
  onAddDepartment: (dept: Department) => void;
  onUpdateDepartment: (dept: Department) => void;
  onDeleteDepartment: (id: string) => void;
  onToggleDepartment: (id: string) => void;
  onAddRole: (role: Role) => void;
  onUpdateRole: (role: Role) => void;
  onDeleteRole: (id: string) => void;
  onToggleRole: (id: string) => void;
  onAddTenant: (tenant: Tenant) => void;
  onUpdateTenant: (tenant: Tenant) => void;
  onDeleteTenant: (id: string) => void;
  onToggleTenant: (id: string) => void;
  onAddQualification: (qual: Qualification) => void;
  onUpdateQualification: (qual: Qualification) => void;
  onDeleteQualification: (id: string) => void;
  onToggleQualification: (id: string) => void;
  onAddAvailability: (avail: Availability) => void;
  onUpdateAvailability: (avail: Availability) => void;
  onDeleteAvailability: (id: string) => void;
  onToggleAvailability: (id: string) => void;
  onAddShift: (shift: Shift) => void;
  onUpdateShift: (shift: Shift) => void;
  onDeleteShift: (id: string) => void;
  onToggleShift: (id: string) => void;
}

export function Configuration({ 
  departments, roles, tenants, qualifications, availabilities, shifts,
  onAddDepartment, onUpdateDepartment, onDeleteDepartment, onToggleDepartment,
  onAddRole, onUpdateRole, onDeleteRole, onToggleRole,
  onAddTenant, onUpdateTenant, onDeleteTenant, onToggleTenant,
  onAddQualification, onUpdateQualification, onDeleteQualification, onToggleQualification,
  onAddAvailability, onUpdateAvailability, onDeleteAvailability, onToggleAvailability,
  onAddShift, onUpdateShift, onDeleteShift, onToggleShift
}: ConfigurationProps) {
  const [activeSubTab, setActiveSubTab] = useState<'roles' | 'departments' | 'tenants' | 'qualifications' | 'availabilities' | 'shifts'>('roles');

  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

  const [newDept, setNewDept] = useState({ name: '', head: '', description: '' });
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);

  const [newTenant, setNewTenant] = useState({ name: '', location: '' });
  const [editingTenantId, setEditingTenantId] = useState<string | null>(null);

  const [newQual, setNewQual] = useState({ name: '', description: '' });
  const [editingQualId, setEditingQualId] = useState<string | null>(null);

  const [newAvail, setNewAvail] = useState({ name: '', description: '' });
  const [editingAvailId, setEditingAvailId] = useState<string | null>(null);

  const [newShift, setNewShift] = useState({ name: '', days: [] as string[] });
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);

  const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // --- Roles ---
  const handleSaveRole = () => {
    if (!newRole.name) return;
    if (editingRoleId) {
      onUpdateRole({ id: editingRoleId, ...newRole });
      setEditingRoleId(null);
    } else {
      onAddRole({ id: `R-0${roles.length + 1}`, ...newRole });
    }
    setNewRole({ name: '', description: '' });
  };

  const handleEditRole = (role: Role) => {
    setEditingRoleId(role.id);
    setNewRole({ name: role.name, description: role.description });
  };

  const cancelEditRole = () => {
    setEditingRoleId(null);
    setNewRole({ name: '', description: '' });
  };

  // --- Departments ---
  const handleSaveDept = () => {
    if (!newDept.name) return;
    if (editingDeptId) {
      onUpdateDepartment({ id: editingDeptId, ...newDept });
      setEditingDeptId(null);
    } else {
      onAddDepartment({ id: `D-0${departments.length + 1}`, ...newDept });
    }
    setNewDept({ name: '', head: '', description: '' });
  };

  const handleEditDept = (dept: Department) => {
    setEditingDeptId(dept.id);
    setNewDept({ name: dept.name, head: dept.head, description: dept.description });
  };

  const cancelEditDept = () => {
    setEditingDeptId(null);
    setNewDept({ name: '', head: '', description: '' });
  };

  // --- Tenants ---
  const handleSaveTenant = () => {
    if (!newTenant.name) return;
    if (editingTenantId) {
      onUpdateTenant({ id: editingTenantId, ...newTenant });
      setEditingTenantId(null);
    } else {
      onAddTenant({ id: `T-0${tenants.length + 1}`, ...newTenant });
    }
    setNewTenant({ name: '', location: '' });
  };

  const handleEditTenant = (tenant: Tenant) => {
    setEditingTenantId(tenant.id);
    setNewTenant({ name: tenant.name, location: tenant.location });
  };

  const cancelEditTenant = () => {
    setEditingTenantId(null);
    setNewTenant({ name: '', location: '' });
  };

  // --- Qualifications ---
  const handleSaveQual = () => {
    if (!newQual.name) return;
    if (editingQualId) {
      onUpdateQualification({ id: editingQualId, ...newQual });
      setEditingQualId(null);
    } else {
      onAddQualification({ id: `Q-0${qualifications.length + 1}`, ...newQual });
    }
    setNewQual({ name: '', description: '' });
  };

  const handleEditQual = (qual: Qualification) => {
    setEditingQualId(qual.id);
    setNewQual({ name: qual.name, description: qual.description });
  };

  const cancelEditQual = () => {
    setEditingQualId(null);
    setNewQual({ name: '', description: '' });
  };

  // --- Availabilities ---
  const handleSaveAvail = () => {
    if (!newAvail.name) return;
    if (editingAvailId) {
      onUpdateAvailability({ id: editingAvailId, ...newAvail });
      setEditingAvailId(null);
    } else {
      onAddAvailability({ id: `A-0${availabilities.length + 1}`, ...newAvail });
    }
    setNewAvail({ name: '', description: '' });
  };

  const handleEditAvail = (avail: Availability) => {
    setEditingAvailId(avail.id);
    setNewAvail({ name: avail.name, description: avail.description });
  };

  const cancelEditAvail = () => {
    setEditingAvailId(null);
    setNewAvail({ name: '', description: '' });
  };

  // --- Shifts ---
  const handleSaveShift = () => {
    if (!newShift.name || newShift.days.length === 0) return;
    if (editingShiftId) {
      onUpdateShift({ id: editingShiftId, ...newShift });
      setEditingShiftId(null);
    } else {
      onAddShift({ id: `SH-0${shifts.length + 1}`, ...newShift });
    }
    setNewShift({ name: '', days: [] });
  };

  const handleEditShift = (shift: Shift) => {
    setEditingShiftId(shift.id);
    setNewShift({ name: shift.name, days: shift.days });
  };

  const cancelEditShift = () => {
    setEditingShiftId(null);
    setNewShift({ name: '', days: [] });
  };

  const handleToggleDay = (day: string) => {
    setNewShift(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-border-subtle pb-2">
        <button 
          onClick={() => setActiveSubTab('roles')}
          className={`px-4 py-2 text-[13px] font-medium rounded-md transition-colors ${activeSubTab === 'roles' ? 'bg-accent text-white' : 'bg-surface text-gray-600 hover:bg-surface2'}`}
        >
          Roles
        </button>
        <button 
          onClick={() => setActiveSubTab('departments')}
          className={`px-4 py-2 text-[13px] font-medium rounded-md transition-colors ${activeSubTab === 'departments' ? 'bg-accent text-white' : 'bg-surface text-gray-600 hover:bg-surface2'}`}
        >
          Departments
        </button>
        <button 
          onClick={() => setActiveSubTab('tenants')}
          className={`px-4 py-2 text-[13px] font-medium rounded-md transition-colors ${activeSubTab === 'tenants' ? 'bg-accent text-white' : 'bg-surface text-gray-600 hover:bg-surface2'}`}
        >
          Hospitals (Tenants)
        </button>
        <button 
          onClick={() => setActiveSubTab('qualifications')}
          className={`px-4 py-2 text-[13px] font-medium rounded-md transition-colors ${activeSubTab === 'qualifications' ? 'bg-accent text-white' : 'bg-surface text-gray-600 hover:bg-surface2'}`}
        >
          Qualifications
        </button>
        <button 
          onClick={() => setActiveSubTab('availabilities')}
          className={`px-4 py-2 text-[13px] font-medium rounded-md transition-colors ${activeSubTab === 'availabilities' ? 'bg-accent text-white' : 'bg-surface text-gray-600 hover:bg-surface2'}`}
        >
          Availabilities
        </button>
        <button 
          onClick={() => setActiveSubTab('shifts')}
          className={`px-4 py-2 text-[13px] font-medium rounded-md transition-colors ${activeSubTab === 'shifts' ? 'bg-accent text-white' : 'bg-surface text-gray-600 hover:bg-surface2'}`}
        >
          Shifts
        </button>
      </div>

      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        {activeSubTab === 'shifts' && (
          <div>
            <div className="p-4 border-b border-border-subtle bg-surface2 flex flex-col gap-3">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-[11px] text-gray-500 mb-1">Shift Name / Time</label>
                  <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="e.g. 9AM–5PM" value={newShift.name} onChange={e => setNewShift({...newShift, name: e.target.value})} />
                </div>
                <div className="flex gap-2">
                  {editingShiftId && (
                    <button onClick={cancelEditShift} className="px-3 py-2 bg-surface text-gray-600 border border-border-subtle rounded-md text-[12px] font-medium hover:bg-surface2 flex items-center gap-1.5 h-[34px]">
                      <X className="w-3.5 h-3.5" /> Cancel
                    </button>
                  )}
                  <button onClick={handleSaveShift} className="px-4 py-2 bg-accent text-white rounded-md text-[12px] font-medium hover:bg-accent-dark flex items-center gap-1.5 h-[34px]">
                    {editingShiftId ? <Edit className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />} 
                    {editingShiftId ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">Days (Multi-select)</label>
                <div className="flex flex-wrap gap-1.5">
                  {DAYS_OF_WEEK.map(day => (
                    <button
                      key={day}
                      onClick={() => handleToggleDay(day)}
                      className={`px-2.5 py-1 rounded-md text-[11px] border transition-colors ${newShift.days.includes(day) ? 'bg-accent text-white border-accent' : 'bg-surface text-gray-600 border-border-subtle hover:bg-surface2'}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <table className="w-full text-left text-[12px] border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[100px]">ID</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[200px]">Shift Name</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500">Days</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[160px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map(s => (
                  <tr key={s.id} className={`border-b border-border-subtle last:border-0 hover:bg-[#fafaf9] ${s.isActive === false ? 'opacity-60' : ''}`}>
                    <td className="py-2.5 px-4 text-gray-500">{s.id}</td>
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-accent" /> {s.name}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {s.days.map(d => <span key={d} className="bg-surface2 border border-border-subtle px-1.5 py-0.5 rounded text-[10px] text-gray-600">{d.substring(0, 3)}</span>)}
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => onToggleShift(s.id)} className={`text-[10px] px-2 py-1 rounded border ${s.isActive === false ? 'border-accent text-accent bg-accent/10' : 'border-border-subtle text-gray-600 hover:bg-surface2'}`}>
                          {s.isActive === false ? 'Enable' : 'Disable'}
                        </button>
                        <button onClick={() => handleEditShift(s)} className="text-accent hover:text-accent-dark p-1"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => onDeleteShift(s.id)} className="text-danger hover:text-red-700 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'availabilities' && (
          <div>
            <div className="p-4 border-b border-border-subtle bg-surface2 flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">Availability Status</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="e.g. OPD" value={newAvail.name} onChange={e => setNewAvail({...newAvail, name: e.target.value})} />
              </div>
              <div className="flex-[2]">
                <label className="block text-[11px] text-gray-500 mb-1">Description</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="Description..." value={newAvail.description} onChange={e => setNewAvail({...newAvail, description: e.target.value})} />
              </div>
              <div className="flex gap-2">
                {editingAvailId && (
                  <button onClick={cancelEditAvail} className="px-3 py-2 bg-surface text-gray-600 border border-border-subtle rounded-md text-[12px] font-medium hover:bg-surface2 flex items-center gap-1.5 h-[34px]">
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
                <button onClick={handleSaveAvail} className="px-4 py-2 bg-accent text-white rounded-md text-[12px] font-medium hover:bg-accent-dark flex items-center gap-1.5 h-[34px]">
                  {editingAvailId ? <Edit className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />} 
                  {editingAvailId ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
            <table className="w-full text-left text-[12px] border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[100px]">ID</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[200px]">Status</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500">Description</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[160px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {availabilities.map(a => (
                  <tr key={a.id} className={`border-b border-border-subtle last:border-0 hover:bg-[#fafaf9] ${a.isActive === false ? 'opacity-60' : ''}`}>
                    <td className="py-2.5 px-4 text-gray-500">{a.id}</td>
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-accent" /> {a.name}</td>
                    <td className="py-2.5 px-4">{a.description}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => onToggleAvailability(a.id)} className={`text-[10px] px-2 py-1 rounded border ${a.isActive === false ? 'border-accent text-accent bg-accent/10' : 'border-border-subtle text-gray-600 hover:bg-surface2'}`}>
                          {a.isActive === false ? 'Enable' : 'Disable'}
                        </button>
                        <button onClick={() => handleEditAvail(a)} className="text-accent hover:text-accent-dark p-1"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => onDeleteAvailability(a.id)} className="text-danger hover:text-red-700 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'roles' && (
          <div>
            <div className="p-4 border-b border-border-subtle bg-surface2 flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">Role Name</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="e.g. Pharmacist" value={newRole.name} onChange={e => setNewRole({...newRole, name: e.target.value})} />
              </div>
              <div className="flex-[2]">
                <label className="block text-[11px] text-gray-500 mb-1">Description</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="Role description..." value={newRole.description} onChange={e => setNewRole({...newRole, description: e.target.value})} />
              </div>
              <div className="flex gap-2">
                {editingRoleId && (
                  <button onClick={cancelEditRole} className="px-3 py-2 bg-surface text-gray-600 border border-border-subtle rounded-md text-[12px] font-medium hover:bg-surface2 flex items-center gap-1.5 h-[34px]">
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
                <button onClick={handleSaveRole} className="px-4 py-2 bg-accent text-white rounded-md text-[12px] font-medium hover:bg-accent-dark flex items-center gap-1.5 h-[34px]">
                  {editingRoleId ? <Edit className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />} 
                  {editingRoleId ? 'Update Role' : 'Add Role'}
                </button>
              </div>
            </div>
            <table className="w-full text-left text-[12px] border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[100px]">ID</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[200px]">Role Name</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500">Description</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[160px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(r => (
                  <tr key={r.id} className={`border-b border-border-subtle last:border-0 hover:bg-[#fafaf9] ${r.isActive === false ? 'opacity-60' : ''}`}>
                    <td className="py-2.5 px-4 text-gray-500">{r.id}</td>
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-accent" /> {r.name}</td>
                    <td className="py-2.5 px-4">{r.description}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => onToggleRole(r.id)} className={`text-[10px] px-2 py-1 rounded border ${r.isActive === false ? 'border-accent text-accent bg-accent/10' : 'border-border-subtle text-gray-600 hover:bg-surface2'}`}>
                          {r.isActive === false ? 'Enable' : 'Disable'}
                        </button>
                        <button onClick={() => handleEditRole(r)} className="text-accent hover:text-accent-dark p-1"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => onDeleteRole(r.id)} className="text-danger hover:text-red-700 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'departments' && (
          <div>
            <div className="p-4 border-b border-border-subtle bg-surface2 flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">Dept Name</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="e.g. Pediatrics" value={newDept.name} onChange={e => setNewDept({...newDept, name: e.target.value})} />
              </div>
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">Head</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="e.g. Dr. Smith" value={newDept.head} onChange={e => setNewDept({...newDept, head: e.target.value})} />
              </div>
              <div className="flex-[2]">
                <label className="block text-[11px] text-gray-500 mb-1">Description</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="Dept description..." value={newDept.description} onChange={e => setNewDept({...newDept, description: e.target.value})} />
              </div>
              <div className="flex gap-2">
                {editingDeptId && (
                  <button onClick={cancelEditDept} className="px-3 py-2 bg-surface text-gray-600 border border-border-subtle rounded-md text-[12px] font-medium hover:bg-surface2 flex items-center gap-1.5 h-[34px]">
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
                <button onClick={handleSaveDept} className="px-4 py-2 bg-accent text-white rounded-md text-[12px] font-medium hover:bg-accent-dark flex items-center gap-1.5 h-[34px]">
                  {editingDeptId ? <Edit className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />} 
                  {editingDeptId ? 'Update Dept' : 'Add Dept'}
                </button>
              </div>
            </div>
            <table className="w-full text-left text-[12px] border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[100px]">ID</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[200px]">Department</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[200px]">Head</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500">Description</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[160px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map(d => (
                  <tr key={d.id} className={`border-b border-border-subtle last:border-0 hover:bg-[#fafaf9] ${d.isActive === false ? 'opacity-60' : ''}`}>
                    <td className="py-2.5 px-4 text-gray-500">{d.id}</td>
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-accent" /> {d.name}</td>
                    <td className="py-2.5 px-4">{d.head}</td>
                    <td className="py-2.5 px-4">{d.description}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => onToggleDepartment(d.id)} className={`text-[10px] px-2 py-1 rounded border ${d.isActive === false ? 'border-accent text-accent bg-accent/10' : 'border-border-subtle text-gray-600 hover:bg-surface2'}`}>
                          {d.isActive === false ? 'Enable' : 'Disable'}
                        </button>
                        <button onClick={() => handleEditDept(d)} className="text-accent hover:text-accent-dark p-1"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => onDeleteDepartment(d.id)} className="text-danger hover:text-red-700 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'tenants' && (
          <div>
            <div className="p-4 border-b border-border-subtle bg-surface2 flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">Hospital Name</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="e.g. MediCore East" value={newTenant.name} onChange={e => setNewTenant({...newTenant, name: e.target.value})} />
              </div>
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">Location</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="e.g. East Side" value={newTenant.location} onChange={e => setNewTenant({...newTenant, location: e.target.value})} />
              </div>
              <div className="flex gap-2">
                {editingTenantId && (
                  <button onClick={cancelEditTenant} className="px-3 py-2 bg-surface text-gray-600 border border-border-subtle rounded-md text-[12px] font-medium hover:bg-surface2 flex items-center gap-1.5 h-[34px]">
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
                <button onClick={handleSaveTenant} className="px-4 py-2 bg-accent text-white rounded-md text-[12px] font-medium hover:bg-accent-dark flex items-center gap-1.5 h-[34px]">
                  {editingTenantId ? <Edit className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />} 
                  {editingTenantId ? 'Update Hospital' : 'Add Hospital'}
                </button>
              </div>
            </div>
            <table className="w-full text-left text-[12px] border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[100px]">ID</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[250px]">Hospital Name</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500">Location</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[160px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map(t => (
                  <tr key={t.id} className={`border-b border-border-subtle last:border-0 hover:bg-[#fafaf9] ${t.isActive === false ? 'opacity-60' : ''}`}>
                    <td className="py-2.5 px-4 text-gray-500">{t.id}</td>
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-accent" /> {t.name}</td>
                    <td className="py-2.5 px-4">{t.location}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => onToggleTenant(t.id)} className={`text-[10px] px-2 py-1 rounded border ${t.isActive === false ? 'border-accent text-accent bg-accent/10' : 'border-border-subtle text-gray-600 hover:bg-surface2'}`}>
                          {t.isActive === false ? 'Enable' : 'Disable'}
                        </button>
                        <button onClick={() => handleEditTenant(t)} className="text-accent hover:text-accent-dark p-1"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => onDeleteTenant(t.id)} className="text-danger hover:text-red-700 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'qualifications' && (
          <div>
            <div className="p-4 border-b border-border-subtle bg-surface2 flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">Qualification Name</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="e.g. MBBS" value={newQual.name} onChange={e => setNewQual({...newQual, name: e.target.value})} />
              </div>
              <div className="flex-[2]">
                <label className="block text-[11px] text-gray-500 mb-1">Description</label>
                <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] focus:border-accent outline-none" placeholder="Qualification description..." value={newQual.description} onChange={e => setNewQual({...newQual, description: e.target.value})} />
              </div>
              <div className="flex gap-2">
                {editingQualId && (
                  <button onClick={cancelEditQual} className="px-3 py-2 bg-surface text-gray-600 border border-border-subtle rounded-md text-[12px] font-medium hover:bg-surface2 flex items-center gap-1.5 h-[34px]">
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
                <button onClick={handleSaveQual} className="px-4 py-2 bg-accent text-white rounded-md text-[12px] font-medium hover:bg-accent-dark flex items-center gap-1.5 h-[34px]">
                  {editingQualId ? <Edit className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />} 
                  {editingQualId ? 'Update Qual' : 'Add Qual'}
                </button>
              </div>
            </div>
            <table className="w-full text-left text-[12px] border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[100px]">ID</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[200px]">Qualification Name</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500">Description</th>
                  <th className="py-2.5 px-4 font-medium text-[11px] text-gray-500 w-[160px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {qualifications.map(q => (
                  <tr key={q.id} className={`border-b border-border-subtle last:border-0 hover:bg-[#fafaf9] ${q.isActive === false ? 'opacity-60' : ''}`}>
                    <td className="py-2.5 px-4 text-gray-500">{q.id}</td>
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5 text-accent" /> {q.name}</td>
                    <td className="py-2.5 px-4">{q.description}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => onToggleQualification(q.id)} className={`text-[10px] px-2 py-1 rounded border ${q.isActive === false ? 'border-accent text-accent bg-accent/10' : 'border-border-subtle text-gray-600 hover:bg-surface2'}`}>
                          {q.isActive === false ? 'Enable' : 'Disable'}
                        </button>
                        <button onClick={() => handleEditQual(q)} className="text-accent hover:text-accent-dark p-1"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => onDeleteQualification(q.id)} className="text-danger hover:text-red-700 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
