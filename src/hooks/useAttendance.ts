/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppUser, AttendanceRecord, AttendanceSession, UserRole } from '../types';
import { DUMMY_RECORDS, MOCK_CLASSROOM } from '../constants';
import { calculateDistance } from '../utils/geo';

export const useAttendance = () => {
  const [view, setView] = useState<'login' | 'register' | 'attendance' | 'history' | 'lecturer' | 'organizations'>('login');
  const [user, setUser] = useState<AppUser | null>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [currentCoords, setCurrentCoords] = useState<{ lat: number, lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', password: '', role: 'student' as UserRole, rememberMe: false });
  const [regForm, setRegForm] = useState({ id: '', name: '', password: '', role: 'student' as UserRole });
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<{dept: string, year: string} | null>(null);
  
  // Session management
  const [activeSession, setActiveSession] = useState<AttendanceSession | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // in seconds

  // Derived Values
  const isInRange = distance !== null && distance <= MOCK_CLASSROOM.radius;
  const studentRecords = user ? records.filter(r => r.studentId === user.id) : [];
  const attendanceRate = studentRecords.length > 0 ? (studentRecords.filter(r => r.status === 'present').length / 10) * 100 : 0;

  // Initialize
  useEffect(() => {
    const savedUser = localStorage.getItem('jkuat_user');
    const savedRecords = localStorage.getItem('jkuat_attendance');
    const rememberMeData = localStorage.getItem('jkuat_remember_me');
    const savedSession = localStorage.getItem('jkuat_active_session');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as AppUser;
      setUser(parsedUser);
      setView(parsedUser.role === 'student' ? 'attendance' : 'lecturer');
    } else if (rememberMeData) {
      const data = JSON.parse(rememberMeData);
      setLoginForm(prev => ({ ...prev, id: data.id, role: data.role, rememberMe: true }));
    }

    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    } else {
      setRecords(DUMMY_RECORDS);
      localStorage.setItem('jkuat_attendance', JSON.stringify(DUMMY_RECORDS));
    }

    if (savedSession) {
      const session = JSON.parse(savedSession) as AttendanceSession;
      if (session.isActive) {
        setActiveSession(session);
        if (session.duration) {
          const elapsed = Math.floor((Date.now() - new Date(session.startTime).getTime()) / 1000);
          const remaining = (session.duration * 60) - elapsed;
          if (remaining > 0) {
            setTimeLeft(remaining);
          } else {
            setActiveSession(null);
            localStorage.removeItem('jkuat_active_session');
          }
        }
      }
    }
  }, []);

  // Sync across tabs
  useEffect(() => {
    const syncSession = () => {
      const currentSession = localStorage.getItem('jkuat_active_session');
      if (currentSession) {
        const parsed = JSON.parse(currentSession) as AttendanceSession;
        if (parsed.isActive && parsed.duration) {
          const elapsed = Math.floor((Date.now() - new Date(parsed.startTime).getTime()) / 1000);
          const remaining = (parsed.duration * 60) - elapsed;
          if (remaining > 0) {
            setActiveSession(parsed);
            setTimeLeft(remaining);
            return;
          }
        } else if (parsed.isActive && !parsed.duration) {
           setActiveSession(parsed);
           setTimeLeft(null);
           return;
        }
      }
      setActiveSession(null);
      setTimeLeft(null);
    };

    window.addEventListener('storage', syncSession);
    const interval = setInterval(syncSession, 2000);
    return () => {
      window.removeEventListener('storage', syncSession);
      clearInterval(interval);
    };
  }, []);

  // Error clearing
  useEffect(() => {
    if (activeSession && error?.includes("not active")) {
      setError(null);
    }
  }, [activeSession, error]);

  useEffect(() => {
    if (isInRange && error?.includes("allow location access")) {
      setError(null);
    }
  }, [isInRange, error]);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSession && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev && prev > 1) return prev - 1;
          setActiveSession(null);
          localStorage.removeItem('jkuat_active_session');
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession, timeLeft]);

  const startSession = (durationMinutes?: number) => {
    if (!user || user.role !== 'lecturer') return;
    const newSession: AttendanceSession = {
      id: Math.random().toString(36).substr(2, 9),
      lecturerId: user.id,
      startTime: new Date().toISOString(),
      duration: durationMinutes,
      isActive: true
    };
    setActiveSession(newSession);
    localStorage.setItem('jkuat_active_session', JSON.stringify(newSession));
    if (durationMinutes) {
      setTimeLeft(durationMinutes * 60);
    } else {
      setTimeLeft(null);
    }
    setError(null);
  };

  const endSession = () => {
    setActiveSession(null);
    setTimeLeft(null);
    localStorage.removeItem('jkuat_active_session');
  };

  const updateLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    const timeoutId = setTimeout(() => {
      if (isLocating) {
        setError("Location request timed out. Please check your browser's location settings.");
        setIsLocating(false);
      }
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;
        setCurrentCoords({ lat: latitude, lng: longitude });
        const dist = calculateDistance(latitude, longitude, MOCK_CLASSROOM.lat, MOCK_CLASSROOM.lng);
        setDistance(dist);
        setIsLocating(false);
        setError(null);
      },
      (err) => {
        clearTimeout(timeoutId);
        setError("Please allow location access to sign attendance");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const validateId = (id: string, role: UserRole) => {
    if (role === 'student') {
      const studentIdRegex = /^[A-Z]{3}\d{3}-\d{4}\/\d{4}$/;
      return studentIdRegex.test(id);
    } else {
      return id.endsWith('@jkuat.ac.ke');
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginForm.id || !loginForm.password) {
      setError("Please fill in all fields");
      return;
    }
    if (loginForm.password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }
    if (!validateId(loginForm.id, loginForm.role)) {
      setError(loginForm.role === 'student' 
        ? "Registration number must follow the format SCM211-0000/20XX" 
        : "Lecturer email must end with @jkuat.ac.ke");
      return;
    }

    if (loginForm.rememberMe) {
      localStorage.setItem('jkuat_remember_me', JSON.stringify({ id: loginForm.id, role: loginForm.role }));
    } else {
      localStorage.removeItem('jkuat_remember_me');
    }

    const mockUser: AppUser = {
      id: loginForm.id,
      name: loginForm.role === 'student' ? "Janet Muthoni" : "Dr John Kimani",
      role: loginForm.role,
      course: "BSc. Software Engineering",
      department: "Computing & IT",
      year: "Fourth Year",
      email: loginForm.role === 'student' ? `${loginForm.id.toLowerCase().replace('/', '_')}@students.jkuat.ac.ke` : loginForm.id
    };

    setUser(mockUser);
    localStorage.setItem('jkuat_user', JSON.stringify(mockUser));
    setView(loginForm.role === 'student' ? 'attendance' : 'lecturer');
    setError(null);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!regForm.id || !regForm.name || !regForm.password) {
      setError("Please fill in all fields");
      return;
    }
    if (regForm.password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }
    if (!validateId(regForm.id, regForm.role)) {
      setError(regForm.role === 'student' 
        ? "Registration number must follow the format SCM211-0000/20XX" 
        : "Lecturer email must end with @jkuat.ac.ke");
      return;
    }

    const newUser: AppUser = {
      id: regForm.id,
      name: regForm.name,
      role: regForm.role,
      email: regForm.role === 'student' ? `${regForm.id.toLowerCase().replace('/', '_')}@students.jkuat.ac.ke` : regForm.id,
      course: regForm.role === 'student' ? "BSc. Software Engineering" : undefined,
      department: "Computing & IT",
      year: regForm.role === 'student' ? "Fourth Year" : undefined
    };

    setUser(newUser);
    localStorage.setItem('jkuat_user', JSON.stringify(newUser));
    setView(newUser.role === 'student' ? 'attendance' : 'lecturer');
    setError(null);
  };

  const signAttendance = () => {
    if (!user || distance === null || distance > MOCK_CLASSROOM.radius) return;
    if (!activeSession) {
      setError("Attendance session is not active. Please wait for the lecturer to start the session.");
      return;
    }
    const today = new Date().toDateString();
    const alreadySigned = records.some(r => 
      r.studentId === user.id && 
      new Date(r.timestamp).toDateString() === today
    );

    if (alreadySigned) {
      setError("You have already signed attendance for today.");
      return;
    }

    const newRecord: AttendanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      studentId: user.id,
      studentName: user.name,
      timestamp: new Date().toISOString(),
      location: currentCoords!,
      className: MOCK_CLASSROOM.name,
      status: 'present',
      department: user.department || 'Computing & IT',
      year: user.year || 'Fourth Year'
    };

    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    localStorage.setItem('jkuat_attendance', JSON.stringify(updatedRecords));
    setError(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    updateLocation();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jkuat_user');
    setView('login');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    view, setView, user, records, activeSession, timeLeft,
    isInRange, studentRecords, attendanceRate,
    isLocating, distance, showSuccess, loginForm, setLoginForm,
    regForm, setRegForm, error, setError, selectedClass, setSelectedClass,
    handleLogin, handleRegister, logout, updateLocation, signAttendance,
    startSession, endSession, formatTime
  };
};
