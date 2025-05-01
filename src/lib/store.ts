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
          habits: state.habits.map((habit) =>
            habit.id === habitId
              ? { ...habit, entries: { ...habit.entries, [date]: status } }
              : habit
          ),
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
