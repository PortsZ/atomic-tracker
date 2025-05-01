"use client";

import React from "react";
import { Habit } from "@/types/habit";
import { HabitCalendar } from "@/components/HabitCalendar";
import { HabitCard } from "@/components/HabitCard";

interface HabitContainerProps {
  habit: Habit;
}

export function HabitContainer({ habit }: HabitContainerProps) {
  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <HabitCard habit={habit} />
      <HabitCalendar habit={habit} />
    </div>
  );
}
