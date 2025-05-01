"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Habit, HabitStatus } from "@/types/habit";
import { useHabitStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HabitCalendarProps {
  habit: Habit;
}

export function HabitCalendar({ habit }: HabitCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [unlockInput, setUnlockInput] = useState("");
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);
  const { updateHabitStatus } = useHabitStore();

  const handleDayClick = (day: Date | undefined) => {
    if (!day) return;
    setSelectedDate(day);

    const dateStr = day.toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];

    // Check if we're trying to modify a past date and if lock is enabled
    if (dateStr < today && habit.lockPastEntries) {
      setShowUnlockDialog(true);
      return;
    }

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

  const handleUnlock = () => {
    if (unlockInput === "I understand" && selectedDate) {
      setShowUnlockDialog(false);

      // Get the date string and cycle the status
      const dateStr = selectedDate.toISOString().split("T")[0];
      const currentStatus = habit.entries[dateStr] || "pending";
      const nextStatus: HabitStatus =
        currentStatus === "pending"
          ? "done"
          : currentStatus === "done"
          ? "missed"
          : "pending";

      updateHabitStatus(habit.id, dateStr, nextStatus);
      setUnlockInput("");
    }
  };

  // Custom day renderer to show habit status
  const renderDay = (day: Date) => {
    const dateStr = day.toISOString().split("T")[0];
    const status = habit.entries[dateStr];

    return (
      <div className="relative flex h-full w-full items-center justify-center">
        {day.getDate()}
        <div className="absolute bottom-1">
          {status === "done" && <span>✅</span>}
          {status === "missed" && <span>❌</span>}
          {status === "pending" && <span>⬜</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="w-full max-w-md mx-auto">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDayClick}
          className="border rounded-md"
          components={{
            Day: ({ date }) => renderDay(date),
          }}
        />
      </div>

      <Dialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlock Past Date</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Past dates are locked for editing. Type &quot;I understand&quot;
              to confirm you want to edit anyway.
            </p>
            <input
              type="text"
              value={unlockInput}
              onChange={(e) => setUnlockInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type 'I understand' to continue"
            />
            <Button
              onClick={handleUnlock}
              disabled={unlockInput !== "I understand"}
            >
              Unlock and Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
