/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence } from 'motion/react';
import { useAttendance } from './hooks/useAttendance';
import { MOCK_CLASSROOM } from './constants';

// Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SuccessModal } from './components/SuccessModal';

// Views
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { AttendanceView } from './views/AttendanceView';
import { HistoryView } from './views/HistoryView';
import { LecturerDashboardView } from './views/LecturerDashboardView';
import { OrganizationsView } from './views/OrganizationsView';

export default function App() {
  const {
    view, setView, user, records, activeSession, timeLeft,
    isInRange, studentRecords, attendanceRate,
    isLocating, distance, showSuccess, loginForm, setLoginForm,
    regForm, setRegForm, error, setError, selectedClass, setSelectedClass,
    handleLogin, handleRegister, logout, updateLocation, signAttendance,
    startSession, endSession, formatTime
  } = useAttendance();

  return (
    <div className="fixed inset-0 bg-[#fdfaf6] flex flex-col items-center font-sans overflow-hidden select-none">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-10">
        <div className="w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="flex-1 w-full max-w-md p-6 overflow-y-auto relative z-10 no-scrollbar pb-32">
        <SuccessModal 
          show={showSuccess} 
          message="Attendance logged successfully for PAM LAB." 
        />

        <AnimatePresence mode="wait">
          {view === 'login' && (
            <LoginView 
              loginForm={loginForm} 
              setLoginForm={setLoginForm}
              error={error}
              setError={setError}
              handleLogin={handleLogin}
              setView={setView}
            />
          )}

          {view === 'register' && (
            <RegisterView 
              regForm={regForm}
              setRegForm={setRegForm}
              handleRegister={handleRegister}
              setView={setView}
            />
          )}

          {view === 'lecturer' && user?.role === 'lecturer' && (
            <LecturerDashboardView 
              user={user}
              records={records}
              activeSession={activeSession}
              timeLeft={timeLeft}
              formatTime={formatTime}
              endSession={endSession}
              startSession={startSession}
            />
          )}

          {view === 'organizations' && (
            <OrganizationsView 
              records={records}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
            />
          )}

          {view === 'attendance' && user && (
            <AttendanceView 
              user={user}
              studentRecords={studentRecords}
              isInRange={isInRange}
              activeSession={activeSession}
              isLocating={isLocating}
              distance={distance}
              mockClassroom={MOCK_CLASSROOM}
              signAttendance={signAttendance}
              updateLocation={updateLocation}
            />
          )}

          {view === 'history' && (
            <HistoryView 
              attendanceRate={attendanceRate}
              studentRecords={studentRecords}
            />
          )}
        </AnimatePresence>
      </main>

      {user && (
        <BottomNav 
          user={user} 
          view={view} 
          setView={setView} 
          logout={logout} 
        />
      )}
    </div>
  );
}
