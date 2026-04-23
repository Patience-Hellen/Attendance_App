/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AttendanceRecord, Classroom } from './types';

// Palette Emerald/Green
export const PRIMARY = '#059669'; // Green 600
export const ACCENT = '#10b981';  // Emerald 500
export const BG_LIGHT = '#f0fdf4'; // Light Green 50
export const BORD_COL = '#dcfce7'; // Light Green 100
export const DANGER = '#ef4444';

export const DUMMY_RECORDS: AttendanceRecord[] = [
  // Computing & IT
  { id: '1', studentId: 'SCM211-0123/2021', studentName: 'Alice Wambui', timestamp: new Date(Date.now() - 86400000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Fourth Year' },
  { id: '2', studentId: 'SCM211-0456/2021', studentName: 'Bob Otieno', timestamp: new Date(Date.now() - 172800000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Fourth Year' },
  { id: '3', studentId: 'SCM211-0789/2021', studentName: 'Charlie Kamau', timestamp: new Date(Date.now() - 86400000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Third Year' },
  { id: '4', studentId: 'SCM211-0001/2022', studentName: 'Jane JKUAT', timestamp: new Date(Date.now() - 3600000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Fourth Year' },
  { id: '5', studentId: 'SCM211-0002/2022', studentName: 'Peter Kibet', timestamp: new Date(Date.now() - 7200000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Second Year' },
  
  // Test Student (SCM211-0000/2024)
  { id: 's1', studentId: 'SCM211-0000/2024', studentName: 'Janet Muthoni', timestamp: new Date(Date.now() - 43200000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Fourth Year' },
  { id: 's2', studentId: 'SCM211-0000/2024', studentName: 'Janet Muthoni', timestamp: new Date(Date.now() - 129600000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Fourth Year' },
  { id: 's3', studentId: 'SCM211-0000/2024', studentName: 'Janet Muthoni', timestamp: new Date(Date.now() - 216000000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Fourth Year' },

  // Engineering
  { id: 'e1', studentId: 'ENE411-0001/2021', studentName: 'Kevin Maina', timestamp: new Date().toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Engineering', year: 'Fourth Year' },
  { id: 'e2', studentId: 'ENE211-0002/2023', studentName: 'Mary Atieno', timestamp: new Date().toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Engineering', year: 'Second Year' },
  { id: 'e3', studentId: 'ENE111-0003/2024', studentName: 'Simon Njau', timestamp: new Date().toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Engineering', year: 'First Year' },

  // Business
  { id: 'b1', studentId: 'BBA411-0001/2021', studentName: 'Faith Wanja', timestamp: new Date().toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Business Administration', year: 'Fourth Year' },
  { id: 'b2', studentId: 'BBA311-0002/2022', studentName: 'George Mwangi', timestamp: new Date().toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Business Administration', year: 'Third Year' },
  { id: 's4', studentId: 'SCM211-0000/2024', studentName: 'Janet Muthoni', timestamp: new Date(Date.now() - 302400000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Fourth Year' },
  { id: 's5', studentId: 'SCM211-0000/2024', studentName: 'Janet Muthoni', timestamp: new Date(Date.now() - 388800000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Fourth Year' },
  { id: 's6', studentId: 'SCM211-0000/2024', studentName: 'Janet Muthoni', timestamp: new Date(Date.now() - 475200000).toISOString(), location: { lat: -1.091, lng: 37.012 }, className: 'PAM LAB', status: 'present', department: 'Computing & IT', year: 'Fourth Year' }
];

export const MOCK_CLASSROOM: Classroom = {
  id: 'sci-101',
  name: 'PAM LAB',
  lat: -1.0912,
  lng: 37.0117,
  radius: 50
};
