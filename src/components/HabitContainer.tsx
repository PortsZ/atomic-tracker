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
    <div className="flex gap-4 py-4 w-full  mx-auto">
      <div className="w-2/5">
        <HabitCard habit={habit} />
      </div>
      <div className="w-3/5">
        <HabitCalendar habit={habit} />
      </div>
    </div>
  );
}
