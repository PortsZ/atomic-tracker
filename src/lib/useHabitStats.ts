import { useMemo } from "react";
import { Habit, HabitStats } from "@/types/habit";

export function useHabitStats(habit: Habit): HabitStats {
  return useMemo(() => {
    // 1. Get all entry dates, sort them, and use the earliest as the start
    const entryDates = Object.keys(habit.entries);
    const startDate = entryDates.length
      ? new Date(entryDates.sort()[0])
      : new Date(); // fallback to today if no entries

    const today = new Date();
    const dates: string[] = [];

    // 2. Build an array of ISO strings from startDate up through today
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split("T")[0]);
    }

    // 3. Calculate current streak (count backwards until first non-done)
    let currentStreak = 0;
    for (let i = dates.length - 1; i >= 0; i--) {
      if (habit.entries[dates[i]] === "done") {
        currentStreak++;
      } else {
        break;
      }
    }

    // 4. Calculate longest streak (simple max-window)
    let longestStreak = 0;
    let tempStreak = 0;
    for (const date of dates) {
      if (habit.entries[date] === "done") {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    // 5. Completion % toward the 90-day goal
    const completedDays = entryDates.filter(
      (d) => habit.entries[d] === "done"
    ).length;
    const completionPercentage = Math.min(
      Math.round((completedDays / 90) * 100),
      100
    );

    return { currentStreak, longestStreak, completionPercentage };
  }, [habit]);
}
