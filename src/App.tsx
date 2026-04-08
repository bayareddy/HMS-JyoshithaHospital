import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { NewPatientModal } from './components/NewPatientModal';
import { NewDoctorModal } from './components/NewDoctorModal';
import { NewDepartmentModal } from './components/NewDepartmentModal';
import { EditScheduleModal } from './components/EditScheduleModal';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Beds } from './pages/Beds';
import { Appointments } from './pages/Appointments';
import { Pharmacy } from './pages/Pharmacy';
import { Billing } from './pages/Billing';
import { Staff } from './pages/Staff';
import { Departments } from './pages/Departments';
import { Schedules } from './pages/Schedules';
import { Reports } from './pages/Reports';
import { Configuration } from './pages/Configuration';
import { initialPatients, staffList, initialDepartments, initialRoles, initialTenants, initialQualifications, initialAvailabilities, initialShifts } from './data';
import { Patient, Staff as StaffType, Department, Role, Tenant, Qualification, Availability, Shift } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [staff, setStaff] = useState<StaffType[]>(staffList);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [qualifications, setQualifications] = useState<Qualification[]>(initialQualifications);
  const [availabilities, setAvailabilities] = useState<Availability[]>(initialAvailabilities);
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffType | null>(null);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [scheduleModalStaff, setScheduleModalStaff] = useState<StaffType | null>(null);

  const handleSavePatient = (newPatient: Patient) => {
    setPatients([newPatient, ...patients]);
    setActiveTab('patients');
  };

  const handleToggleStaffStatus = (id: string) => {
    setStaff(staff.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const handleSaveStaff = (staffData: StaffType) => {
    if (editingStaff) {
      setStaff(staff.map(s => s.id === staffData.id ? staffData : s));
    } else {
      setStaff([staffData, ...staff]);
    }
  };

  const handleAddDepartment = (newDept: Department) => setDepartments([...departments, newDept]);
  const handleUpdateDepartment = (updatedDept: Department) => setDepartments(departments.map(d => d.id === updatedDept.id ? updatedDept : d));
  const handleDeleteDepartment = (id: string) => setDepartments(departments.filter(d => d.id !== id));
  const handleToggleDepartment = (id: string) => setDepartments(departments.map(d => d.id === id ? { ...d, isActive: d.isActive === false ? true : false } : d));

  const handleAddRole = (newRole: Role) => setRoles([...roles, newRole]);
  const handleUpdateRole = (updatedRole: Role) => setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
  const handleDeleteRole = (id: string) => setRoles(roles.filter(r => r.id !== id));
  const handleToggleRole = (id: string) => setRoles(roles.map(r => r.id === id ? { ...r, isActive: r.isActive === false ? true : false } : r));

  const handleAddTenant = (newTenant: Tenant) => setTenants([...tenants, newTenant]);
  const handleUpdateTenant = (updatedTenant: Tenant) => setTenants(tenants.map(t => t.id === updatedTenant.id ? updatedTenant : t));
  const handleDeleteTenant = (id: string) => setTenants(tenants.filter(t => t.id !== id));
  const handleToggleTenant = (id: string) => setTenants(tenants.map(t => t.id === id ? { ...t, isActive: t.isActive === false ? true : false } : t));

  const handleAddQualification = (newQual: Qualification) => setQualifications([...qualifications, newQual]);
  const handleUpdateQualification = (updatedQual: Qualification) => setQualifications(qualifications.map(q => q.id === updatedQual.id ? updatedQual : q));
  const handleDeleteQualification = (id: string) => setQualifications(qualifications.filter(q => q.id !== id));
  const handleToggleQualification = (id: string) => setQualifications(qualifications.map(q => q.id === id ? { ...q, isActive: q.isActive === false ? true : false } : q));

  const handleAddAvailability = (newAvail: Availability) => setAvailabilities([...availabilities, newAvail]);
  const handleUpdateAvailability = (updatedAvail: Availability) => setAvailabilities(availabilities.map(a => a.id === updatedAvail.id ? updatedAvail : a));
  const handleDeleteAvailability = (id: string) => setAvailabilities(availabilities.filter(a => a.id !== id));
  const handleToggleAvailability = (id: string) => setAvailabilities(availabilities.map(a => a.id === id ? { ...a, isActive: a.isActive === false ? true : false } : a));

  const handleAddShift = (newShift: Shift) => setShifts([...shifts, newShift]);
  const handleUpdateShift = (updatedShift: Shift) => setShifts(shifts.map(s => s.id === updatedShift.id ? updatedShift : s));
  const handleDeleteShift = (id: string) => setShifts(shifts.filter(s => s.id !== id));
  const handleToggleShift = (id: string) => setShifts(shifts.map(s => s.id === id ? { ...s, isActive: s.isActive === false ? true : false } : s));

  const handleUpdateSchedule = (id: string, assignedShifts: StaffType['assignedShifts'], availability: string, opdWindow: string) => {
    setStaff(staff.map(s => s.id === id ? { ...s, assignedShifts, availability, opdWindow } : s));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && activeTab !== 'patients') {
      setActiveTab('patients');
    }
  };

  const filteredPatients = searchQuery.trim() 
    ? patients.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : patients;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard patients={patients} onNavigate={setActiveTab} />;
      case 'patients': return <Patients patients={filteredPatients} />;
      case 'beds': return <Beds />;
      case 'appointments': return <Appointments />;
      case 'pharmacy': return <Pharmacy />;
      case 'billing': return <Billing />;
      case 'departments': return <Departments departments={departments} staffList={staff} onOpenModal={() => setIsDeptModalOpen(true)} />;
      case 'staff': return <Staff staffList={staff} onToggleStatus={handleToggleStaffStatus} onOpenModal={() => { setEditingStaff(null); setIsDoctorModalOpen(true); }} onEditStaff={(s) => { setEditingStaff(s); setIsDoctorModalOpen(true); }} onDeleteStaff={handleDeleteStaff} />;
      case 'schedules': return <Schedules staffList={staff} onEditSchedule={setScheduleModalStaff} />;
      case 'reports': return <Reports />;
      case 'configuration': return (
        <Configuration 
          departments={departments} roles={roles} tenants={tenants} qualifications={qualifications} availabilities={availabilities} shifts={shifts}
          onAddDepartment={handleAddDepartment} onUpdateDepartment={handleUpdateDepartment} onDeleteDepartment={handleDeleteDepartment} onToggleDepartment={handleToggleDepartment}
          onAddRole={handleAddRole} onUpdateRole={handleUpdateRole} onDeleteRole={handleDeleteRole} onToggleRole={handleToggleRole}
          onAddTenant={handleAddTenant} onUpdateTenant={handleUpdateTenant} onDeleteTenant={handleDeleteTenant} onToggleTenant={handleToggleTenant}
          onAddQualification={handleAddQualification} onUpdateQualification={handleUpdateQualification} onDeleteQualification={handleDeleteQualification} onToggleQualification={handleToggleQualification}
          onAddAvailability={handleAddAvailability} onUpdateAvailability={handleUpdateAvailability} onDeleteAvailability={handleDeleteAvailability} onToggleAvailability={handleToggleAvailability}
          onAddShift={handleAddShift} onUpdateShift={handleUpdateShift} onDeleteShift={handleDeleteShift} onToggleShift={handleToggleShift}
        />
      );
      default: return <Dashboard patients={patients} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f2f0] text-[#1a1a1a] font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          title={activeTab} 
          onOpenModal={() => setIsModalOpen(true)} 
          onSearch={handleSearch}
        />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {renderContent()}
        </div>
      </div>

      <NewPatientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSavePatient} 
      />
      <NewDoctorModal
        isOpen={isDoctorModalOpen}
        onClose={() => { setIsDoctorModalOpen(false); setEditingStaff(null); }}
        onSave={handleSaveStaff}
        departments={departments}
        roles={roles}
        tenants={tenants}
        qualifications={qualifications}
        editingStaff={editingStaff}
      />
      <NewDepartmentModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        onSave={handleAddDepartment}
        staffList={staff}
      />
      <EditScheduleModal
        staff={scheduleModalStaff}
        onClose={() => setScheduleModalStaff(null)}
        onSave={handleUpdateSchedule}
        availabilities={availabilities}
        shifts={shifts}
      />
    </div>
  );
}
