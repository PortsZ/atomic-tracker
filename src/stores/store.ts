import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Habit, HabitStatus } from "@/types/habit";

interface HabitStore {
  habits: Habit[];
  addHabit: (name: string) => void;
  updateHabitStatus: (
    habitId: string,
    date: string,
    status: HabitStatus
  ) => void;
  toggleLockPastEntries: (habitId: string) => void;
  deleteHabit: (habitId: string) => void;
}

// Utility function to sort entries by date
function sortEntries(entries: Record<string, HabitStatus>) {
  return Object.fromEntries(
    Object.entries(entries).sort(([a], [b]) => a.localeCompare(b))
  );
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [],
      addHabit: (name: string) => {
        const newHabit: Habit = {
          id: `habit-${Date.now()}`,
          name,
          createdAt: new Date().toISOString().split("T")[0],
          entries: {},
          lockPastEntries: true,
        };

        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },
      updateHabitStatus: (
        habitId: string,
        date: string,
        status: HabitStatus
      ) => {
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== habitId) return habit;
            const merged = { ...habit.entries, [date]: status };
            // This sorting is to ensure that the entries are always sorted by date
            const sorted = sortEntries(merged);

            return { ...habit, entries: sorted };
          }),
        }));
      },
      toggleLockPastEntries: (habitId: string) => {
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === habitId
              ? { ...habit, lockPastEntries: !habit.lockPastEntries }
              : habit
          ),
        }));
      },
      deleteHabit: (habitId: string) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== habitId),
        }));
      },
    }),
    {
      name: "habit-storage",
    }
  )
);
