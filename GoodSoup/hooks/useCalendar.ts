import { useState, useEffect } from 'react';

interface CalendarData {
  daysInMonth: (number | null)[];
  weeks: (number | null)[][];
  monthName: string;
  currentDay: number | null;
}

export function useCalendar(): CalendarData {
  const [daysInMonth, setDaysInMonth] = useState<(number | null)[]>([]);
  const [monthName, setMonthName] = useState('');
  const [currentDay, setCurrentDay] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const daysArray: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(i);
    }

    setDaysInMonth(daysArray);
    setMonthName(
      firstDayOfMonth.toLocaleString('default', { month: 'long' }) + ' ' + currentYear
    );
    setCurrentDay(today.getDate());
  }, []);

  // Group days into weeks
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];
  for (let i = 0; i < daysInMonth.length; i++) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(daysInMonth[i]);
  }
  if (currentWeek.length) weeks.push(currentWeek);

  return { daysInMonth, weeks, monthName, currentDay };
}