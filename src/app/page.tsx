"use client";

import { useState } from "react";
import { useHabitStore } from "@/lib/store";
import { AddHabitForm } from "@/components/AddHabitForm";
import { HabitContainer } from "@/components/HabitContainer";

export default function Home() {
  const habits = useHabitStore((state) => state.habits);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(
    habits.length > 0 ? habits[0].id : null
  );

  const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">Atomic Habit Tracker</h1>
        <p className="text-muted-foreground">
          Track your habits and build consistency
        </p>
      </header>

      <main className="grid gap-8">
        <AddHabitForm />

        {habits.length > 0 ? (
          <div className="space-y-6">
            <div className="flex overflow-x-auto gap-2 pb-4">
              {habits.map((habit) => (
                <button
                  key={habit.id}
                  onClick={() => setSelectedHabitId(habit.id)}
                  className={`px-4 py-2 rounded-md whitespace-nowrap ${
                    selectedHabitId === habit.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {habit.name}
                </button>
              ))}
            </div>

            {selectedHabit ? (
              <HabitContainer habit={selectedHabit} />
            ) : (
              <p className="text-center text-muted-foreground">
                Select a habit to track
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">No habits added yet.</p>
            <p className="text-sm">
              Add your first habit above to get started!
            </p>
          </div>
        )}
      </main>

      <footer className="text-center text-sm text-muted-foreground">
        <p>Inspired by Atomic Habits by James Clear</p>
      </footer>
    </div>
  );
}
