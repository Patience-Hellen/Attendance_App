/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { UserRole } from '../types';

interface RegisterViewProps {
  regForm: any;
  setRegForm: (val: any) => void;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  setView: (view: any) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ 
  regForm, 
  setRegForm, 
  handleRegister, 
  setView 
}) => {
  return (
    <motion.div 
      key="register"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mt-4 bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
    >
      <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">New Account</h2>
      <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
         {(['student', 'lecturer'] as UserRole[]).map(r => (
           <button 
            key={r}
            onClick={() => setRegForm({...regForm, role: r})}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${regForm.role === r ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400'}`}
           >
             {r}
           </button>
         ))}
      </div>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Full Name</label>
          <input 
            type="text" 
            placeholder="Janet Muthoni"
            value={regForm.name}
            onChange={e => setRegForm({...regForm, name: e.target.value})}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
            {regForm.role === 'student' ? 'Registration Number' : 'Work Email'}
          </label>
          <input 
            type="text" 
            placeholder={regForm.role === 'student' ? "SCM211-0000/20XX" : "name@jkuat.ac.ke"}
            value={regForm.id}
            onChange={e => setRegForm({...regForm, id: e.target.value})}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Create Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={regForm.password}
            onChange={e => setRegForm({...regForm, password: e.target.value})}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-emerald-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20 active:scale-95 transition-all text-sm mt-4"
        >
          Create Account
        </button>
        <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase">
          Already have an account? {' '}
          <button type="button" onClick={() => setView('login')} className="text-emerald-700 hover:underline text-emerald-700 font-extrabold capitalize">Log In</button>
        </p>
      </form>
    </motion.div>
  );
};
