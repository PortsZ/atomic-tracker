"use client";

import React from "react";
import { Habit } from "@/types/habit";
import { HabitCalendar } from "@/components/HabitCalendar";
import { HabitCard } from "@/components/HabitCard";
import MotivationalMessage from "./MotivationalMessage";

interface HabitContainerProps {
  habit: Habit;
}

export function HabitContainer({ habit }: HabitContainerProps) {
  return (
    <div className="flex gap-4 py-2 w-full  mx-auto">
      <div className="w-2/5 flex flex-col gap-4">
        <HabitCard habit={habit} />
        <MotivationalMessage />
      </div>
      <div className="w-3/5">
        <HabitCalendar habit={habit} />
      </div>
    </div>
  );
}
