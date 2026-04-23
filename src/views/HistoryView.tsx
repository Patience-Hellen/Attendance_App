/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar } from 'lucide-react';
import { AttendanceRecord } from '../types';

interface HistoryViewProps {
  attendanceRate: number;
  studentRecords: AttendanceRecord[];
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  attendanceRate,
  studentRecords
}) => {
  return (
    <motion.div 
      key="history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6"
    >
      {/* Analytics Header */}
      <div className="bg-emerald-600 p-6 rounded-[40px] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CheckCircle2 size={120} />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">Semester Progress</p>
          <h2 className="text-4xl font-black">{Math.round(attendanceRate)}%</h2>
          <div className="w-full bg-white/20 h-2 rounded-full mt-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${attendanceRate}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end px-2">
        <h3 className="text-lg font-black text-gray-800">Recent Logs</h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{studentRecords.length} Records</span>
      </div>
      
      <div className="space-y-3 pb-8">
        {studentRecords.length === 0 ? (
          <div className="bg-white p-12 rounded-[40px] border border-gray-100 flex flex-col items-center text-gray-300">
            <Calendar size={48} className="mb-2 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">No entries yet</p>
          </div>
        ) : (
          studentRecords.map((record) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={record.id}
              className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-50 flex justify-between items-center group active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="font-extrabold text-gray-800 text-sm">{record.className}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                    {new Date(record.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'})}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
                  Verified
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};
