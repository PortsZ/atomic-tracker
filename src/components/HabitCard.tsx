"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useHabitStats } from "@/lib/useHabitStats";
import { getMotivationalMessage } from "@/lib/motivationalMessages";
import { Habit } from "@/types/habit";
import { useHabitStore } from "@/lib/store";

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const { currentStreak, longestStreak, completionPercentage } =
    useHabitStats(habit);
  const motivationalMessage = getMotivationalMessage(completionPercentage);
  const { toggleLockPastEntries, deleteHabit } = useHabitStore();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{habit.name}</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleLockPastEntries(habit.id)}
          >
            {habit.lockPastEntries ? "Unlock" : "Lock"} Past Dates
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteHabit(habit.id)}
          >
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">{currentStreak} days</p>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm text-muted-foreground">Longest Streak</p>
              <p className="text-2xl font-bold">{longestStreak} days</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Progress to 90-day goal</p>
              <p className="text-sm font-medium">{completionPercentage}%</p>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          <p className="text-sm italic mt-4 text-muted-foreground">
            &quot;{motivationalMessage}&quot;
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
