import React, { useState } from 'react';
import { Patient } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: Patient) => void;
}

export function NewPatientModal({ isOpen, onClose, onSave }: ModalProps) {
  const [formData, setFormData] = useState({
    first: '', last: '', dob: '', gender: '', phone: '', blood: '',
    emergency: '', dept: '', doctor: '', complaint: '', allergy: '',
    priority: 'Normal', insurance: '', policy: ''
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (!formData.first || !formData.last) {
      alert('Please enter patient name.');
      return;
    }
    
    const newPt: Patient = {
      id: `P-${Math.floor(Math.random() * 1000) + 4500}`,
      name: `${formData.first} ${formData.last}`,
      age: '—',
      gender: formData.gender || '—',
      ward: formData.dept || '—',
      doctor: formData.doctor || '—',
      diagnosis: formData.complaint || '—',
      blood: formData.blood || '—',
      status: 'admitted',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    onSave(newPt);
    setFormData({
      first: '', last: '', dob: '', gender: '', phone: '', blood: '',
      emergency: '', dept: '', doctor: '', complaint: '', allergy: '',
      priority: 'Normal', insurance: '', policy: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black/35 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-surface rounded-xl border border-border-subtle w-full max-w-[420px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 px-5 border-b border-border-subtle flex justify-between items-center sticky top-0 bg-surface z-10">
          <span className="text-[15px] font-medium">Register New Patient</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        
        <div className="p-5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">First name *</label>
              <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" placeholder="First name" value={formData.first} onChange={e => setFormData({...formData, first: e.target.value})} />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Last name *</label>
              <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" placeholder="Last name" value={formData.last} onChange={e => setFormData({...formData, last: e.target.value})} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Date of birth</label>
              <input type="date" className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Gender</label>
              <select className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Phone number *</label>
              <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Blood group</label>
              <select className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" value={formData.blood} onChange={e => setFormData({...formData, blood: e.target.value})}>
                <option value="">Select</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-gray-500 mb-1">Emergency contact name & relationship</label>
            <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" placeholder="e.g. Rahul Kumar (Son)" value={formData.emergency} onChange={e => setFormData({...formData, emergency: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Department *</label>
              <select className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})}>
                <option value="">Select</option><option>General Medicine</option><option>Cardiology</option><option>Neurology</option><option>Orthopedics</option><option>OB/GYN</option><option>ICU</option><option>Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Assign doctor *</label>
              <select className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" value={formData.doctor} onChange={e => setFormData({...formData, doctor: e.target.value})}>
                <option value="">Select</option><option>Dr. Vikram Mehta</option><option>Dr. Sunita Kapoor</option><option>Dr. Ravi Singh</option><option>Dr. Anita Iyer</option><option>Dr. Preethi Verma</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-gray-500 mb-1">Chief complaint / Presenting symptoms *</label>
            <textarea rows={2} className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none resize-none" placeholder="Describe symptoms or reason for admission..." value={formData.complaint} onChange={e => setFormData({...formData, complaint: e.target.value})}></textarea>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Known allergies</label>
              <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" placeholder="e.g. Penicillin, Aspirin" value={formData.allergy} onChange={e => setFormData({...formData, allergy: e.target.value})} />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Priority</label>
              <select className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                <option>Normal</option><option>Urgent</option><option>Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Insurance provider</label>
              <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" placeholder="e.g. Star Health, None" value={formData.insurance} onChange={e => setFormData({...formData, insurance: e.target.value})} />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Policy number</label>
              <input className="w-full p-2 border border-border-subtle rounded-md text-[12px] bg-surface2 focus:bg-white focus:border-accent outline-none" placeholder="Policy / TPA ID" value={formData.policy} onChange={e => setFormData({...formData, policy: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="p-3.5 px-5 border-t border-border-subtle flex gap-2 justify-end sticky bottom-0 bg-surface z-10">
          <button onClick={onClose} className="px-4 py-2 border border-border-subtle rounded-md bg-surface text-[12px] hover:bg-surface2 transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-accent text-white rounded-md text-[12px] font-medium hover:bg-accent-dark transition-colors">Register Patient</button>
        </div>
      </div>
    </div>
  );
}
