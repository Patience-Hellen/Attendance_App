/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'student' | 'lecturer';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  course?: string;
  department?: string;
  year?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  className: string;
  status: 'present' | 'late' | 'absent';
  department: string;
  year: string;
}

export interface Classroom {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number; // in meters
}

export interface AttendanceSession {
  id: string;
  lecturerId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in minutes
  isActive: boolean;
}
