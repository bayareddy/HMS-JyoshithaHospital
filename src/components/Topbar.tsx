import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

interface TopbarProps {
  title: string;
  onOpenModal: () => void;
  onSearch: (query: string) => void;
}

export function Topbar({ title, onOpenModal, onSearch }: TopbarProps) {
  return (
    <div className="h-[56px] bg-surface border-b border-border-subtle flex items-center gap-3 px-5 shrink-0">
      <h2 className="text-[16px] font-medium flex-1 capitalize">{title.replace('-', ' ')}</h2>
      
      <div className="relative hidden sm:block">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-[13px] h-[13px] text-gray-400 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Search patients, doctors..." 
          onChange={(e) => onSearch(e.target.value)}
          className="bg-surface2 border border-border-subtle rounded-md py-[7px] pr-2.5 pl-7 text-[12px] text-gray-900 w-[200px] outline-none focus:border-accent transition-colors"
        />
      </div>

      <button className="w-[34px] h-[34px] border border-border-subtle rounded-md bg-surface cursor-pointer flex items-center justify-center relative hover:bg-surface2 transition-colors">
        <Bell className="w-[15px] h-[15px] text-gray-500" />
        <div className="absolute top-[5px] right-[5px] w-[7px] h-[7px] bg-danger rounded-full border-[1.5px] border-surface"></div>
      </button>

      <button 
        onClick={onOpenModal}
        className="px-3.5 py-[7px] bg-accent text-white border-none rounded-md text-[12px] cursor-pointer flex items-center gap-1.5 font-medium hover:bg-accent-dark transition-colors"
      >
        <Plus className="w-[13px] h-[13px]" />
        New Patient
      </button>
    </div>
  );
}
