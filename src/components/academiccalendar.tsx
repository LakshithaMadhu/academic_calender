"use client";

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, Info } from 'lucide-react';

// --- Types ---
type CourseCode = 'EEI4360' | 'EEI4370' | 'EEI5263' | 'EEI5265' | 'EEI5364' | 'EER6289' | 'EEW5611' | 'LLM5281' | 'MHJ5282' | 'MHJ5383' | 'MHZ5375';

interface AcademicEvent {
  id: string;
  course: CourseCode;
  courseName: string;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string;
  endTime: string;
  location: string;
}

// --- Data Extraction ---
const EVENT_DATA: AcademicEvent[] = [
  // EEI4360 Introduction to Artificial Intelligence
  { id: '1', course: 'EEI4360', courseName: 'Intro to AI', title: 'Interactive Learning Session 1', date: '2026-05-10', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '2', course: 'EEI4360', courseName: 'Intro to AI', title: 'Interactive Learning Session 2', date: '2026-05-31', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '3', course: 'EEI4360', courseName: 'Intro to AI', title: 'Lab 1', date: '2026-06-07', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '4', course: 'EEI4360', courseName: 'Intro to AI', title: 'Interactive Learning Session 3', date: '2026-06-14', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '5', course: 'EEI4360', courseName: 'Intro to AI', title: 'Lab 2', date: '2026-06-21', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '6', course: 'EEI4360', courseName: 'Intro to AI', title: 'CA-Test 1', date: '2026-07-04', startTime: '09:00', endTime: '10:15', location: 'RS5C' },
  { id: '7', course: 'EEI4360', courseName: 'Intro to AI', title: 'Interactive Learning Session 4', date: '2026-07-19', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '8', course: 'EEI4360', courseName: 'Intro to AI', title: 'Interactive Learning Session 5', date: '2026-07-26', startTime: '10:30', endTime: '12:30', location: 'CL' },
  { id: '9', course: 'EEI4360', courseName: 'Intro to AI', title: 'Interactive Learning Session 6', date: '2026-08-02', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '10', course: 'EEI4360', courseName: 'Intro to AI', title: 'Lab 3', date: '2026-08-15', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '11', course: 'EEI4360', courseName: 'Intro to AI', title: 'Final Examination 1', date: '2026-09-10', startTime: '09:30', endTime: '12:30', location: 'RS5C' },

  // EEI4370 Computer Security Concepts
  { id: '12', course: 'EEI4370', courseName: 'Computer Security', title: 'Interactive Learning Session 1', date: '2026-10-04', startTime: '13:00', endTime: '15:30', location: 'CL' },
  { id: '13', course: 'EEI4370', courseName: 'Computer Security', title: 'Interactive Learning Session 2', date: '2026-10-17', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '14', course: 'EEI4370', courseName: 'Computer Security', title: 'Interactive Learning Session 3', date: '2026-10-31', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '15', course: 'EEI4370', courseName: 'Computer Security', title: 'CA-Test 1', date: '2026-11-14', startTime: '10:30', endTime: '11:45', location: 'RS5C' },
  { id: '16', course: 'EEI4370', courseName: 'Computer Security', title: 'Interactive Learning Session 4', date: '2026-11-28', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '17', course: 'EEI4370', courseName: 'Computer Security', title: 'Interactive Learning Session 5', date: '2026-12-05', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '18', course: 'EEI4370', courseName: 'Computer Security', title: 'Mini Project 1', date: '2026-12-06', startTime: '08:00', endTime: '16:00', location: 'CL' },
  { id: '19', course: 'EEI4370', courseName: 'Computer Security', title: 'Online Quiz 1', date: '2026-12-26', startTime: '09:00', endTime: '10:15', location: 'CL' },
  { id: '20', course: 'EEI4370', courseName: 'Computer Security', title: 'Final Examination 1', date: '2027-01-20', startTime: '09:30', endTime: '12:30', location: 'RS5C' },

  // EEI5263 Computer Organization and Architecture
  { id: '21', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Interactive Learning Session 1', date: '2026-10-04', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '22', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Lab 1', date: '2026-10-11', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '23', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Online Quiz 1', date: '2026-10-16', startTime: '20:00', endTime: '21:00', location: 'CL' },
  { id: '24', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Interactive Learning Session 2', date: '2026-10-24', startTime: '08:00', endTime: '10:00', location: 'CL' },
  { id: '25', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Lab 2', date: '2026-11-01', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '26', course: 'EEI5263', courseName: 'Computer Architecture', title: 'CA-Test 1', date: '2026-11-19', startTime: '09:00', endTime: '10:15', location: 'RS5C' },
  { id: '27', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Online Quiz 2', date: '2026-11-27', startTime: '20:00', endTime: '21:00', location: 'RS5C' },
  { id: '28', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Online Quiz 3', date: '2026-12-04', startTime: '20:00', endTime: '21:00', location: 'CL' },
  { id: '29', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Interactive Learning Session 3', date: '2026-12-05', startTime: '10:30', endTime: '12:30', location: 'CL' },
  { id: '30', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Online Quiz 4', date: '2026-12-18', startTime: '20:00', endTime: '21:00', location: 'CL' },
  { id: '31', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Lab 3', date: '2026-12-26', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '32', course: 'EEI5263', courseName: 'Computer Architecture', title: 'Final Examination 1', date: '2027-02-01', startTime: '09:30', endTime: '12:30', location: 'CL' },

  // EEI5265 Operating Systems
  { id: '33', course: 'EEI5265', courseName: 'Operating Systems', title: 'Interactive Learning Session 1', date: '2026-05-16', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '34', course: 'EEI5265', courseName: 'Operating Systems', title: 'Interactive Learning Session 2', date: '2026-06-06', startTime: '16:00', endTime: '18:00', location: 'CL' },
  { id: '35', course: 'EEI5265', courseName: 'Operating Systems', title: 'Interactive Learning Session 3', date: '2026-06-14', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '36', course: 'EEI5265', courseName: 'Operating Systems', title: 'CA-Test 1', date: '2026-07-03', startTime: '12:00', endTime: '13:15', location: 'RS5C' },
  { id: '37', course: 'EEI5265', courseName: 'Operating Systems', title: 'Lab 1', date: '2026-07-12', startTime: '19:00', endTime: '21:00', location: 'CL' },
  { id: '38', course: 'EEI5265', courseName: 'Operating Systems', title: 'Interactive Learning Session 4', date: '2026-07-19', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '39', course: 'EEI5265', courseName: 'Operating Systems', title: 'Interactive Learning Session 5', date: '2026-08-02', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '40', course: 'EEI5265', courseName: 'Operating Systems', title: 'Design Project 1', date: '2026-08-07', startTime: '08:00', endTime: '16:00', location: 'CL' },
  { id: '41', course: 'EEI5265', courseName: 'Operating Systems', title: 'Final Examination 1', date: '2026-09-02', startTime: '09:30', endTime: '12:30', location: 'RS5C' },

  // EEI5364 Data Communication and Networking
  { id: '42', course: 'EEI5364', courseName: 'Data Comm & Net', title: 'Interactive Learning Session 1', date: '2026-05-17', startTime: '18:00', endTime: '20:00', location: 'CL' },
  { id: '43', course: 'EEI5364', courseName: 'Data Comm & Net', title: 'Interactive Learning Session 2', date: '2026-05-23', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '44', course: 'EEI5364', courseName: 'Data Comm & Net', title: 'Lab 1', date: '2026-06-05', startTime: '09:00', endTime: '16:00', location: 'CL' },
  { id: '45', course: 'EEI5364', courseName: 'Data Comm & Net', title: 'CA-Test 1', date: '2026-07-03', startTime: '09:00', endTime: '10:15', location: 'RS5C' },
  { id: '46', course: 'EEI5364', courseName: 'Data Comm & Net', title: 'Online Quiz 1', date: '2026-07-17', startTime: '20:00', endTime: '21:00', location: 'CL' },
  { id: '47', course: 'EEI5364', courseName: 'Data Comm & Net', title: 'Interactive Learning Session 3', date: '2026-07-18', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '48', course: 'EEI5364', courseName: 'Data Comm & Net', title: 'Interactive Learning Session 4', date: '2026-08-01', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '49', course: 'EEI5364', courseName: 'Data Comm & Net', title: 'Project Report Due 1', date: '2026-08-10', startTime: '08:00', endTime: '16:00', location: 'CL' },
  { id: '50', course: 'EEI5364', courseName: 'Data Comm & Net', title: 'Final Examination 1', date: '2026-09-06', startTime: '09:30', endTime: '12:30', location: 'RS5C' },

  // EER6289 Research Methodology
  { id: '51', course: 'EER6289', courseName: 'Research Methodology', title: 'Workshop 1', date: '2026-05-21', startTime: '19:00', endTime: '21:00', location: 'CL' },
  { id: '52', course: 'EER6289', courseName: 'Research Methodology', title: 'Interactive Learning Session 1', date: '2026-05-23', startTime: '08:00', endTime: '10:00', location: 'CL' },
  { id: '53', course: 'EER6289', courseName: 'Research Methodology', title: 'Interactive Learning Session 2', date: '2026-06-21', startTime: '08:00', endTime: '10:00', location: 'CL' },
  { id: '54', course: 'EER6289', courseName: 'Research Methodology', title: 'CA-Test 1', date: '2026-07-07', startTime: '15:45', endTime: '17:00', location: 'RS5C' },
  { id: '55', course: 'EER6289', courseName: 'Research Methodology', title: 'Progress Presentation 1', date: '2026-08-28', startTime: '08:00', endTime: '16:00', location: 'CL' },
  { id: '56', course: 'EER6289', courseName: 'Research Methodology', title: 'Interactive Learning Session 3', date: '2026-11-29', startTime: '10:30', endTime: '12:30', location: 'CL' },
  { id: '57', course: 'EER6289', courseName: 'Research Methodology', title: 'Final Presentation 1', date: '2026-12-12', startTime: '08:00', endTime: '16:00', location: 'CL' },

  // EEW5611 Industrial Training
  { id: '58', course: 'EEW5611', courseName: 'Industrial Training', title: 'Final Report 1', date: '2027-03-14', startTime: '08:00', endTime: '16:00', location: 'CL' },

  // LLM5281 Basic Laws Relating to Engineering
  { id: '59', course: 'LLM5281', courseName: 'Eng. Basic Laws', title: 'Interactive Learning Session 1', date: '2026-05-10', startTime: '15:00', endTime: '17:00', location: 'CL' },
  { id: '60', course: 'LLM5281', courseName: 'Eng. Basic Laws', title: 'Interactive Learning Session 2', date: '2026-05-24', startTime: '15:00', endTime: '17:00', location: 'CL' },
  { id: '61', course: 'LLM5281', courseName: 'Eng. Basic Laws', title: 'TMA Due 1', date: '2026-05-29', startTime: '09:00', endTime: '12:00', location: 'CL' },
  { id: '62', course: 'LLM5281', courseName: 'Eng. Basic Laws', title: 'Interactive Learning Session 3', date: '2026-06-07', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '63', course: 'LLM5281', courseName: 'Eng. Basic Laws', title: 'Interactive Learning Session 4', date: '2026-06-20', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '64', course: 'LLM5281', courseName: 'Eng. Basic Laws', title: 'CA-Test 1', date: '2026-06-30', startTime: '09:00', endTime: '10:15', location: 'RS5C' },
  { id: '65', course: 'LLM5281', courseName: 'Eng. Basic Laws', title: 'Interactive Learning Session 5', date: '2026-08-16', startTime: '15:00', endTime: '17:00', location: 'CL' },
  { id: '66', course: 'LLM5281', courseName: 'Eng. Basic Laws', title: 'Final Examination 1', date: '2026-09-09', startTime: '13:30', endTime: '16:30', location: 'RS5C' },

  // MHJ5282 History of Technology
  { id: '67', course: 'MHJ5282', courseName: 'History of Tech', title: 'Interactive Learning Session 1', date: '2026-10-03', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '68', course: 'MHJ5282', courseName: 'History of Tech', title: 'TMA Due 1', date: '2026-11-03', startTime: '09:00', endTime: '16:00', location: 'CL' },
  { id: '69', course: 'MHJ5282', courseName: 'History of Tech', title: 'Interactive Learning Session 2', date: '2026-11-07', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '70', course: 'MHJ5282', courseName: 'History of Tech', title: 'CA-Test 1', date: '2026-11-17', startTime: '15:45', endTime: '17:45', location: 'RS5C' },
  { id: '71', course: 'MHJ5282', courseName: 'History of Tech', title: 'Interactive Learning Session 3', date: '2026-12-20', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '72', course: 'MHJ5282', courseName: 'History of Tech', title: 'Final Examination 1', date: '2027-01-31', startTime: '13:30', endTime: '16:30', location: 'RS5C' },

  // MHJ5383 Technology, Society, and Environment
  { id: '73', course: 'MHJ5383', courseName: 'Tech, Society, Env', title: 'Interactive Learning Session 1', date: '2026-06-06', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '74', course: 'MHJ5383', courseName: 'Tech, Society, Env', title: 'Interactive Learning Session 2', date: '2026-06-06', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '75', course: 'MHJ5383', courseName: 'Tech, Society, Env', title: 'TMA Due 1', date: '2026-06-09', startTime: '09:00', endTime: '16:00', location: 'CL' },
  { id: '76', course: 'MHJ5383', courseName: 'Tech, Society, Env', title: 'Interactive Learning Session 3', date: '2026-06-13', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '77', course: 'MHJ5383', courseName: 'Tech, Society, Env', title: 'CA-Test 1', date: '2026-06-28', startTime: '15:45', endTime: '17:45', location: 'RS5C' },
  { id: '78', course: 'MHJ5383', courseName: 'Tech, Society, Env', title: 'Interactive Learning Session 4', date: '2026-07-05', startTime: '10:30', endTime: '12:30', location: 'RS5C' },
  { id: '79', course: 'MHJ5383', courseName: 'Tech, Society, Env', title: 'Interactive Learning Session 5', date: '2026-07-19', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '80', course: 'MHJ5383', courseName: 'Tech, Society, Env', title: 'Interactive Learning Session 6', date: '2026-08-02', startTime: '15:30', endTime: '17:30', location: 'CL' },
  { id: '81', course: 'MHJ5383', courseName: 'Tech, Society, Env', title: 'Final Examination 1', date: '2026-09-15', startTime: '13:30', endTime: '16:30', location: 'CL' },

  // MHZ5375 Discrete Mathematics
  { id: '82', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 1', date: '2026-05-09', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '83', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 2', date: '2026-05-22', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '84', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 3', date: '2026-05-23', startTime: '10:30', endTime: '12:30', location: 'CL' },
  { id: '85', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 4', date: '2026-05-24', startTime: '10:30', endTime: '12:30', location: 'CL' },
  { id: '86', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'TMA Due 1', date: '2026-06-09', startTime: '09:00', endTime: '16:00', location: 'CL' },
  { id: '87', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Tutor Clinic 1', date: '2026-06-19', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '88', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'CA-Test 1', date: '2026-06-30', startTime: '12:00', endTime: '13:15', location: 'Multi-Center' },
  { id: '89', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 5', date: '2026-07-11', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '90', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Tutor Clinic 2', date: '2026-07-17', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '91', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 6', date: '2026-07-18', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '92', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 7', date: '2026-07-25', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '93', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 8', date: '2026-07-31', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '94', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 9', date: '2026-08-02', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '95', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Interactive Learning Session 10', date: '2026-08-07', startTime: '13:00', endTime: '15:00', location: 'CL' },
  { id: '96', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Online Quiz 1', date: '2026-08-12', startTime: '12:00', endTime: '13:15', location: 'CL' },
  { id: '97', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Online Quiz 2', date: '2026-08-12', startTime: '12:00', endTime: '13:15', location: 'CL' },
  { id: '98', course: 'MHZ5375', courseName: 'Discrete Maths', title: 'Final Examination 1', date: '2026-09-20', startTime: '09:30', endTime: '12:30', location: 'RS5C' },
];

// --- Styles (MUI Inspired Palette) ---
const courseColors: Record<CourseCode, string> = {
  EEI4360: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200', // Intro to AI
  EEI4370: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',   // Security
  EEI5263: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200', // Architecture
  EEI5265: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200', // OS
  EEI5364: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200', // Networking
  EER6289: 'bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200', // Research
  EEW5611: 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200', // Training
  LLM5281: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200', // Law
  MHJ5282: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200', // History
  MHJ5383: 'bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200', // Tech Society
  MHZ5375: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200', // Maths
};

// --- Utilities ---
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function AcademicCalendar() {
  // Start the view in the current month
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedEvent, setSelectedEvent] = useState<AcademicEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => setCurrentDate(new Date());

  // --- Memoized Calendar Generation ---
  const calendarGrid = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const grid: { day: number | null, dateStr: string }[] = [];
    
    // Empty prefix cells
    for (let i = 0; i < firstDay; i++) {
      grid.push({ day: null, dateStr: '' });
    }
    
    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const formattedMonth = String(month + 1).padStart(2, '0');
      const formattedDay = String(d).padStart(2, '0');
      grid.push({ day: d, dateStr: `${year}-${formattedMonth}-${formattedDay}` });
    }
    
    return grid;
  }, [year, month]);

  // --- Event Handling ---
  const eventsByDate = useMemo(() => {
    const map = new Map<string, AcademicEvent[]>();
    EVENT_DATA.forEach(event => {
      if (!map.has(event.date)) {
        map.set(event.date, []);
      }
      map.get(event.date)!.push(event);
    });
    // Sort events within each day by start time
    map.forEach(events => {
      events.sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 md:p-8">
      {/* MUI-like Paper Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)] overflow-hidden">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <h1 className="text-2xl font-medium tracking-tight text-gray-900 flex items-center gap-2">
              <CalendarIcon className="text-blue-600 w-6 h-6" />
              {MONTHS[month]} {year}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleToday}
              className="px-4 py-1.5 text-sm font-medium uppercase tracking-wider text-blue-600 rounded hover:bg-blue-50 transition-colors mr-2"
            >
              Today
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <button 
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 transition active:bg-gray-200"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <button 
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 transition active:bg-gray-200"
                aria-label="Next Month"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 bg-gray-200 gap-px">
          {calendarGrid.map((cell, idx) => {
            const dayEvents = cell.dateStr ? eventsByDate.get(cell.dateStr) || [] : [];
            const todayDate = new Date();
            const todayStr = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
            const isToday = cell.dateStr === todayStr;
            return (
              <div 
                key={idx} 
                className={`min-h-[140px] bg-white p-1.5 transition-colors ${!cell.day ? 'bg-gray-50/50' : 'hover:bg-gray-50/30'}`}
              >
                {cell.day && (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-1 px-1">
                      <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>
                        {cell.day}
                      </span>
                    </div>
                    
                    {/* Event List (Scrollable if too many) */}
                    <div className="flex-1 overflow-y-auto max-h-[100px] space-y-1 no-scrollbar pr-1">
                      {dayEvents.map(evt => (
                        <div 
                          key={evt.id}
                          onClick={() => setSelectedEvent(evt)}
                          className={`text-[11px] leading-tight px-1.5 py-1 rounded border cursor-pointer truncate transition-all ${courseColors[evt.course]}`}
                          title={`${evt.courseName}: ${evt.title}`}
                        >
                          <span className="font-semibold block">{evt.startTime}</span>
                          {evt.courseName} - {evt.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MUI-like Modal Dialog for Event Details */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b ${courseColors[selectedEvent.course].split(' ')[0]} bg-opacity-30`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{selectedEvent.courseName}</h3>
                  <p className="text-sm font-medium text-gray-600 mt-1">{selectedEvent.course}</p>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 text-gray-700">
                <Info className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-medium text-[10px]">Activity</p>
                  <p className="font-medium">{selectedEvent.title}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-700">
                <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-medium text-[10px]">Date</p>
                  <p className="font-medium">
                    {new Date(selectedEvent.date).toLocaleDateString('en-GB', { 
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                   <p className="text-sm text-gray-500 uppercase tracking-wide font-medium text-[10px]">Time</p>
                   <p className="font-medium">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-medium text-[10px]">Location / Centre</p>
                  <p className="font-medium">{selectedEvent.location}</p>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 text-sm font-medium uppercase tracking-wider text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global styles block to hide scrollbar for nested event areas */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}