/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderOpen, ChevronRight, Users, UserCheck, User } from 'lucide-react';
import { AttendanceRecord } from '../types';

interface OrganizationsViewProps {
  records: AttendanceRecord[];
  selectedClass: {dept: string, year: string} | null;
  setSelectedClass: (val: any) => void;
}

export const OrganizationsView: React.FC<OrganizationsViewProps> = ({
  records,
  selectedClass,
  setSelectedClass
}) => {
  return (
    <motion.div 
       key="organizations"
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       className="space-y-6 pb-24"
    >
      <div className="bg-emerald-600 p-6 rounded-[40px] text-white shadow-xl relative overflow-hidden">
        <FolderOpen className="absolute top-0 right-0 p-8 opacity-10" size={120} />
        <div className="relative z-10 flex items-center justify-between w-full">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">Class Directory</p>
            <h3 className="text-2xl font-black">Organizations</h3>
          </div>
          {selectedClass && (
            <button 
              onClick={() => setSelectedClass(null)}
              className="bg-white/20 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all"
            >
              Back
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedClass ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid gap-6"
          >
            {['Computing & IT', 'Engineering', 'Business Administration'].map((dept, idx) => (
              <div key={dept} className="bg-white rounded-[32px] overflow-hidden border border-emerald-100 shadow-sm">
                <div className={`p-4 flex items-center gap-3 ${idx === 0 ? 'bg-emerald-700' : idx === 1 ? 'bg-emerald-600' : 'bg-emerald-500'} text-white`}>
                  <FolderOpen size={20} />
                  <h4 className="font-black text-sm uppercase tracking-wide">{dept}</h4>
                </div>
                <div className="p-4 space-y-4">
                  {['First Year', 'Second Year', 'Third Year', 'Fourth Year'].map(year => (
                    <div key={year} className="group" onClick={() => setSelectedClass({ dept, year })}>
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-emerald-800 font-black text-xs shadow-sm shadow-emerald-900/5">
                            {year[0]}
                          </div>
                          <span className="text-xs font-extrabold text-gray-700">{year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black text-emerald-800/40 bg-emerald-800/5 px-2 py-0.5 rounded-full">
                            {records.filter(r => r.department === dept && r.year === year).length} Records
                          </span>
                          <ChevronRight size={14} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-white p-6 rounded-[40px] border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-800 leading-tight">{selectedClass.dept}</h4>
                  <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{selectedClass.year} Class List</p>
                </div>
              </div>

              <div className="space-y-3">
                {records.filter(r => r.department === selectedClass.dept && r.year === selectedClass.year).length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-gray-300">
                     <User size={48} className="opacity-10 mb-2" />
                     <p className="text-[10px] font-black uppercase tracking-widest">No attendance today</p>
                  </div>
                ) : (
                  records.filter(r => r.department === selectedClass.dept && r.year === selectedClass.year).map(record => (
                    <div key={record.id} className="bg-stone-50 p-4 rounded-2xl flex justify-between items-center border border-stone-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                          <UserCheck size={16} />
                        </div>
                        <span className="text-xs font-extrabold text-gray-700">{record.studentName}</span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase">
                        {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
