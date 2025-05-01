import { useMemo } from "react";
import { Habit, HabitStats } from "@/types/habit";

export function useHabitStats(habit: Habit): HabitStats {
  return useMemo(() => {
    // Create an array of dates starting from the habit creation date to today
    const creationDate = new Date(habit.createdAt);
    const today = new Date();
    const dates = [];

    // Generate all dates from creation to today
    for (
      let d = new Date(creationDate);
      d <= today;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(new Date(d).toISOString().split("T")[0]);
    }

    // Calculate current streak
    let currentStreak = 0;
    for (let i = dates.length - 1; i >= 0; i--) {
      const date = dates[i];
      const status = habit.entries[date];

      if (status === "done") {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;

    for (const date of dates) {
      const status = habit.entries[date];

      if (status === "done") {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    // Calculate completion percentage (towards 90-day goal)
    const completedDays = Object.values(habit.entries).filter(
      (status) => status === "done"
    ).length;
    const completionPercentage = Math.min(
      Math.round((completedDays / 90) * 100),
      100
    );

    return {
      currentStreak,
      longestStreak,
      completionPercentage,
    };
  }, [habit]);
}
