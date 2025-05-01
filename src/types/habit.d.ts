export type HabitStatus = "done" | "missed" | "pending";

export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  entries: Record<string, HabitStatus>;
  lockPastEntries: boolean;
}

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  completionPercentage: number;
}
