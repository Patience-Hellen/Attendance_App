/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Presentation, Clock, Square, Timer, Play, UserCheck } from 'lucide-react';
import { AppUser, AttendanceRecord, AttendanceSession } from '../types';

interface LecturerDashboardViewProps {
  user: AppUser;
  records: AttendanceRecord[];
  activeSession: AttendanceSession | null;
  timeLeft: number | null;
  formatTime: (seconds: number) => string;
  endSession: () => void;
  startSession: (duration?: number) => void;
}

export const LecturerDashboardView: React.FC<LecturerDashboardViewProps> = ({
  user,
  records,
  activeSession,
  timeLeft,
  formatTime,
  endSession,
  startSession
}) => {
  return (
    <motion.div 
       key="lecturer"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       className="space-y-6"
    >
      <div className="bg-emerald-600 p-6 rounded-[40px] text-white shadow-xl relative overflow-hidden">
        <Presentation className="absolute top-0 right-0 p-8 opacity-10" size={120} />
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">Lecturer Dashboard</p>
          <h2 className="text-2xl font-black">{user.name}</h2>
          <div className="mt-4 flex gap-4">
             <div className="bg-white/20 p-3 rounded-2xl flex-1">
                <p className="text-[8px] font-bold uppercase mb-1">Students Today</p>
                <p className="text-xl font-black">{records.filter(r => new Date(r.timestamp).toDateString() === new Date().toDateString()).length}</p>
             </div>
             <div className="bg-white/20 p-3 rounded-2xl flex-1">
                <p className="text-[8px] font-bold uppercase mb-1">Total Logs</p>
                <p className="text-xl font-black">{records.length}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Session Control Card */}
      <div className="bg-white p-6 rounded-[40px] shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-black text-gray-800">Attendance Session</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Control student check-ins</p>
          </div>
          {activeSession ? (
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Active
            </div>
          ) : (
            <div className="bg-gray-100 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              Inactive
            </div>
          )}
        </div>

        {activeSession ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <Clock className="text-emerald-600" size={20} />
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Time Remaining</p>
                  <p className="text-xl font-black text-gray-800 tracking-tight">
                    {timeLeft !== null ? formatTime(timeLeft) : 'Unlimited'}
                  </p>
                </div>
              </div>
              <button 
                onClick={endSession}
                className="bg-red-50 text-red-600 p-3 rounded-2xl hover:bg-red-100 transition-colors"
              >
                <Square size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => startSession(60)}
              className="bg-gray-50 p-4 rounded-3xl flex flex-col items-center gap-2 hover:bg-gray-100 transition-all border border-gray-100 group"
            >
              <Timer className="text-gray-400 group-hover:text-emerald-600 transition-colors" size={24} />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">1 Hour Session</span>
            </button>
            <button 
              onClick={() => startSession()}
              className="bg-emerald-600 text-white p-4 rounded-3xl flex flex-col items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
            >
              <Play className="text-white" size={24} fill="currentColor" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Start Manual</span>
            </button>
          </div>
        )}
      </div>

      {/* Organized History for Lecturer - Highlights Only */}
      <div className="space-y-4 bg-white p-6 rounded-[40px] shadow-lg border border-gray-100">
        <h3 className="text-lg font-black text-gray-800">Recent Sign-ins</h3>
        <div className="space-y-3">
          {records.slice(0, 3).map(record => (
            <div key={record.id} className="bg-stone-50 p-4 rounded-2xl flex justify-between items-center border border-stone-100">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-800 p-2 rounded-xl">
                  <UserCheck size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-gray-700">{record.studentName}</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tight">{record.department} • {record.year}</p>
                </div>
              </div>
              <p className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
