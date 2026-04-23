/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, MapIcon, Clock, Navigation, ShieldCheck, MapPin } from 'lucide-react';
import { AppUser, AttendanceRecord, AttendanceSession, Classroom } from '../types';

interface AttendanceViewProps {
  user: AppUser;
  studentRecords: AttendanceRecord[];
  isInRange: boolean;
  activeSession: AttendanceSession | null;
  isLocating: boolean;
  distance: number | null;
  mockClassroom: Classroom;
  signAttendance: () => void;
  updateLocation: () => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  user,
  studentRecords,
  isInRange,
  activeSession,
  isLocating,
  distance,
  mockClassroom,
  signAttendance,
  updateLocation
}) => {
  return (
    <motion.div 
      key="attendance"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-6"
    >
      {/* Enhanced Profile Card */}
      <div className="bg-white p-6 rounded-[40px] shadow-xl border border-gray-100 flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-800">
           <User size={120} />
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-emerald-600 p-4 rounded-2xl text-white shadow-lg shadow-emerald-900/20">
            <User size={24} />
          </div>
          <div>
            <p className="text-lg font-black text-gray-800">{user.name}</p>
            <p className="text-xs text-emerald-700 font-black tracking-widest">{user.id}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-50">
           <div>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Course</p>
              <p className="text-[11px] font-black text-gray-700 leading-tight">{user.course}</p>
           </div>
           <div>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Department</p>
              <p className="text-[11px] font-black text-gray-700 leading-tight">{user.department}</p>
           </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-[28px] shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sessions</p>
          <p className="text-xl font-black text-emerald-700">{studentRecords.length}</p>
        </div>
        <div className="bg-white p-4 rounded-[28px] shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Punctuality</p>
          <p className="text-xl font-black text-emerald-500">Normal</p>
        </div>
      </div>

      {/* Attendance Status */}
      <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-8 relative overflow-hidden">
        <div className="w-full flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <MapIcon size={18} className="text-emerald-700" />
            <span className="text-xs font-bold">{mockClassroom.name}</span>
          </div>
          <motion.div 
            animate={isInRange ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isInRange ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-50 text-orange-600'}`}
          >
            {isInRange ? 'In Classroom' : 'Out of Range'}
          </motion.div>
        </div>

        {!activeSession && (
          <div className="w-full bg-red-50 p-3 rounded-2xl border border-red-100 flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-xl text-white">
              <Clock size={16} />
            </div>
            <p className="text-[10px] font-bold text-red-700 text-left uppercase leading-tight">
              Session inactive. Attendance cannot be signed at this time.
            </p>
          </div>
        )}

        <div className="relative">
          {/* Radar Background */}
          {isLocating && (
            <div className="absolute inset-0 z-0">
              {[1, 1.5, 2].map((s) => (
                <motion.div
                  key={s}
                  initial={{ scale: 0.5, opacity: 0.5 }}
                  animate={{ scale: s + 0.5, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, delay: s * 0.4 }}
                  className="absolute inset-0 bg-emerald-500 rounded-full -m-4"
                />
              ))}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isInRange ? signAttendance : updateLocation}
            disabled={isLocating}
            className={`relative z-10 w-44 h-44 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-500 ${
              isInRange 
                ? 'bg-emerald-600 text-white border-8 border-emerald-50 shadow-emerald-900/40' 
                : 'bg-white border-8 border-gray-50 text-gray-300'
            }`}
          >
            {isLocating ? (
              <div className="animate-bounce flex flex-col items-center">
                <Navigation size={48} className="mb-2 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Scanning...</span>
              </div>
            ) : isInRange ? (
              <>
                <ShieldCheck size={56} className="mb-1" />
                <span className="font-black text-lg">CHECK IN</span>
              </>
            ) : (
              <>
                <MapPin size={56} className="mb-1 opacity-20" />
                <span className="font-bold text-xs">FIND ME</span>
              </>
            )}
          </motion.button>
          
          <AnimatePresence>
            {distance !== null && !isLocating && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-5 py-2 rounded-2xl shadow-lg border border-gray-100 text-[11px] font-black text-emerald-600 flex items-center gap-2 whitespace-nowrap"
              >
                <div className={`w-2 h-2 rounded-full ${isInRange ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-red-400'}`} />
                {Math.round(distance)}m From Center
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
