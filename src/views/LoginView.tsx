/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { UserRole } from '../types';

interface LoginViewProps {
  loginForm: any;
  setLoginForm: (val: any) => void;
  error: string | null;
  setError: (val: string | null) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  setView: (view: any) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ 
  loginForm, 
  setLoginForm, 
  error, 
  setError, 
  handleLogin, 
  setView 
}) => {
  return (
    <motion.div 
      key="login"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mt-4 bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
    >
      <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
         {(['student', 'lecturer'] as UserRole[]).map(r => (
           <button 
            key={r}
            onClick={() => {
              setLoginForm({ ...loginForm, id: '', password: '', role: r, rememberMe: false });
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${loginForm.role === r ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400'}`}
           >
             {r}
           </button>
         ))}
      </div>

      <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">
        {loginForm.role === 'student' ? 'Student Login' : 'Lecturer Login'}
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 text-[10px] p-2 rounded-xl border border-red-100 font-bold uppercase text-center animate-shake">
            {error}
          </div>
        )}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
            {loginForm.role === 'student' ? 'Registration Number' : 'Work Email'}
          </label>
          <input 
            type="text" 
            placeholder={loginForm.role === 'student' ? "SCM211-0000/20XX" : "name@jkuat.ac.ke"}
            value={loginForm.id}
            onChange={e => setLoginForm({...loginForm, id: e.target.value})}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={loginForm.password}
            onChange={e => setLoginForm({...loginForm, password: e.target.value})}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
          />
        </div>

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={loginForm.rememberMe}
              onChange={e => setLoginForm({...loginForm, rememberMe: e.target.checked})}
              className="rounded border-gray-300 text-emerald-600 outline-none focus:ring-0" 
            />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Remember Me</span>
          </label>
          <button type="button" onClick={() => alert("Password reset link sent to your email.")} className="text-[10px] font-bold text-emerald-700 uppercase hover:underline">
            Forgot Password?
          </button>
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20 active:scale-95 transition-all text-sm mt-4"
        >
          Sign In
        </button>

        <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase">
          Don't have an account? {' '}
          <button type="button" onClick={() => setView('register')} className="text-emerald-600 hover:underline">Create Account</button>
        </p>
      </form>
    </motion.div>
  );
};
