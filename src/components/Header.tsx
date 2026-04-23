/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-emerald-600 text-white p-6 shadow-xl flex flex-col items-center relative z-10 rounded-b-[40px]">
      <div className="flex items-center gap-4 mb-1">
        <div className="bg-white p-1 rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-2 border-emerald-400">
           <img src="/jkuat-logo.png" alt="JKUAT" className="w-full h-full object-contain" onError={(e) => {
             (e.target as HTMLImageElement).src = "https://img.icons8.com/color/96/university.png";
           }} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight leading-none">JKUAT</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-100">Attendance Portal</p>
        </div>
      </div>
    </header>
  );
};
