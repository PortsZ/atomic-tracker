import { Habit } from "@/types/habit";

export const getCalendarDays = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1);

  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);

  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayIndex = firstDay.getDay();

  // Calculate the total number of days to display (including padding)
  const totalDays = 42; // 6 rows × 7 days

  const result: Date[] = [];

  // Add padding days from previous month
  for (let i = firstDayIndex; i > 0; i--) {
    const prevMonthDay = new Date(year, month, 1 - i);
    result.push(prevMonthDay);
  }

  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const currentMonthDay = new Date(year, month, i);
    result.push(currentMonthDay);
  }

  // Add padding days from next month
  const remainingDays = totalDays - result.length;
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDay = new Date(year, month + 1, i);
    result.push(nextMonthDay);
  }

  return result;
};

// Format a date to YYYY-MM-DD using local timezone
export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Determine if a date is from the current month
export const isCurrentMonth = (date: Date, currentMonth: Date) => {
  return date.getMonth() === currentMonth.getMonth();
};

// Determine if a date is today using local timezone
export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Check if a date is in the past, but not today
export const isPastDay = (date: Date): boolean => {
  const today = new Date();

  // Set both to start of day for comparison
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  return startOfDate < startOfToday;
};

export const getStatusClass = (date: Date, habit: Habit): string => {
  const dateStr = formatDateKey(date);
  const status = habit.entries[dateStr];

  if (status === "done") {
    return "bg-emerald-500 text-white";
  } else if (status === "missed") {
    return "bg-red-500 text-white";
  }

  return "bg-transparent";
};

export const getStatusEmoji = (date: Date, habit: Habit): string => {
  const dateStr = formatDateKey(date);
  const status = habit.entries[dateStr];

  if (status === "done") {
    return "✅";
  } else if (status === "missed") {
    return "❌";
  }

  return "";
};

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
