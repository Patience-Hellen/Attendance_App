/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, History, Presentation, FolderOpen, LogOut } from 'lucide-react';
import { AppUser } from '../types';

interface BottomNavProps {
  user: AppUser;
  view: string;
  setView: (view: any) => void;
  logout: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ user, view, setView, logout }) => {
  return (
    <AnimatePresence>
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-white/50 rounded-[32px] p-2 flex justify-around items-center z-50 shadow-2xl shadow-emerald-900/10"
      >
        {user.role === 'student' ? (
          <>
            <button 
              onClick={() => setView('attendance')}
              className={`flex-1 flex flex-col items-center justify-center h-16 rounded-3xl transition-all ${
                view === 'attendance' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-gray-400'
              }`}
            >
              <MapPin size={20} strokeWidth={view === 'attendance' ? 3 : 2} />
              <span className="text-[8px] font-black uppercase tracking-widest mt-1">Check In</span>
            </button>
            <button 
              onClick={() => setView('history')}
              className={`flex-1 flex flex-col items-center justify-center h-16 rounded-3xl transition-all ${
                view === 'history' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-gray-400'
              }`}
            >
              <History size={20} strokeWidth={view === 'history' ? 3 : 2} />
              <span className="text-[8px] font-black uppercase tracking-widest mt-1">History</span>
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setView('lecturer')}
              className={`flex-1 flex flex-col items-center justify-center h-16 rounded-3xl transition-all ${
                view === 'lecturer' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-gray-400'
              }`}
            >
              <Presentation size={20} strokeWidth={view === 'lecturer' ? 3 : 2} />
              <span className="text-[8px] font-black uppercase tracking-widest mt-1">Class Hub</span>
            </button>
            <button 
              onClick={() => setView('organizations')}
              className={`flex-1 flex flex-col items-center justify-center h-16 rounded-3xl transition-all ${
                view === 'organizations' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-gray-400'
              }`}
            >
              <FolderOpen size={20} strokeWidth={view === 'organizations' ? 3 : 2} />
              <span className="text-[8px] font-black uppercase tracking-widest mt-1">Directory</span>
            </button>
          </>
        )}
        <button 
          onClick={logout}
          className="flex-1 flex flex-col items-center justify-center h-16 rounded-3xl text-gray-400 active:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-[8px] font-black uppercase tracking-widest mt-1">Exit</span>
        </button>
      </motion.nav>
    </AnimatePresence>
  );
};
