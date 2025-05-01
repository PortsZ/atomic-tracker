"use client";

import React, { useState, useEffect } from "react";
import { Habit, HabitStatus } from "@/types/habit";
import { useHabitStore } from "@/stores/store";
import {
  getCalendarDays,
  formatDateKey,
  isCurrentMonth,
  isToday,
  getStatusClass,
  isPastDay,
  weekdays,
  monthNames,
} from "@/helpers/calendar-helpers";

interface HabitCalendarProps {
  habit: Habit;
}

export function HabitCalendar({ habit }: HabitCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const { updateHabitStatus } = useHabitStore();

  useEffect(() => {
    // Generate calendar days for the current month view
    const days = getCalendarDays(currentMonth);
    setCalendarDays(days);
  }, [currentMonth]);

  const handleDayClick = (day: Date) => {
    // Prevent tracking future days
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (day > today) {
      // Don't allow interactions with future dates
      return;
    }

    // Check if we're trying to modify a past date (not today) and if lock is enabled
    if (isPastDay(day) && habit.lockPastEntries) {
      // If past entries are locked, don't update
      return;
    }

    const dateStr = formatDateKey(day);
    cycleStatus(dateStr);
  };

  const cycleStatus = (dateStr: string) => {
    // Cycle through statuses: pending -> done -> missed -> pending
    const currentStatus = habit.entries[dateStr] || "pending";
    const nextStatus: HabitStatus =
      currentStatus === "pending"
        ? "done"
        : currentStatus === "done"
        ? "missed"
        : "pending";

    updateHabitStatus(habit.id, dateStr, nextStatus);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="space-y-4 w-full">
      <div className="w-full mx-auto h-[80vh]">
        <div className="border border-primary/80 rounded-lg shadow-md h-full flex flex-col">
          {/* Calendar Header */}
          <div className="flex justify-between items-center p-4 border-b border-primary/60">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-full hover:bg-primary/10 select-none"
            >
              &lt;
            </button>
            <h2 className="text-xl font-bold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-primary/10 select-none"
            >
              &gt;
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 p-2 border-b border-primary/60">
            {weekdays.map((day) => (
              <div
                key={day}
                className="text-center font-bold text-primary/50 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 p-2 flex-grow">
            {calendarDays.map((day, index) => {
              const statusClass = getStatusClass(day, habit);
              const isCurrentMonthDay = isCurrentMonth(day, currentMonth);
              const isTodayDay = isToday(day);

              // Check if this day is in the past (not today) and if past entries are locked
              const isLocked = isPastDay(day) && habit.lockPastEntries;

              // Check if this is a future day
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const isFutureDay = day > today;

              return (
                <div
                  key={index}
                  className={`
                    flex justify-center items-center 
                    ${!isCurrentMonthDay ? "opacity-40" : ""}
                    relative
                  `}
                >
                  <div
                    onClick={() => handleDayClick(day)}
                    className={`
                      ${
                        isFutureDay
                          ? "cursor-not-allowed opacity-40"
                          : "cursor-pointer hover:bg-opacity-70 hover:border-2 hover:border-blue-500"
                      }
                      relative flex items-center justify-center
                      rounded-lg ${statusClass} 
                        
                      transition-colors duration-150
                      ${
                        isTodayDay
                          ? "border-2 border-blue-500"
                          : " border-primary/65 border-2"
                      }
                      w-full h-full select-none
                      ${isLocked ? "cursor-not-allowed opacity-60" : ""}
                    `}
                  >
                    <div className="font-bold text-lg">{day.getDate()}</div>
                  </div>
                  {isLocked && (
                    <div
                      className="absolute top-1 right-2 text-sm  z-20"
                      style={{ opacity: 1 }}
                    >
                      🔒
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
