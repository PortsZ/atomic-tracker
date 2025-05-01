"use client";

import { useState } from "react";
import { useHabitStore } from "@/stores/store";

import { HabitContainer } from "@/components/HabitContainer";
import { HabitTabs } from "@/components/HabitTabs";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { AddHabitForm } from "@/components/AddHabitForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const habits = useHabitStore((state) => state.habits);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(
    habits.length > 0 ? habits[0].id : null
  );

  const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen py-3 pb-20 gap-4 px-6 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center flex justify-between items-start">
        <h1 className="text-3xl font-bold ">🚀 Atomic Habit Tracker 🚀</h1>
        <Dialog>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Track your habits and build consistency{" "}
            <span>
              <DialogTrigger>
                <div className="flex items-center gap-2 border rounded-md p-2 border-primary text-primary hover:bg-accent/50 transition-colors pr-4">
                  <PlusIcon className="w-4 h-4" />
                  Create a new habit
                </div>
              </DialogTrigger>
            </span>
          </p>
          <DialogContent>
            <AddHabitForm />
          </DialogContent>
        </Dialog>
        <div className="flex justify-end mb-2">
          <ThemeToggle />
        </div>
      </header>

      <main className="grid gap-4">
        {habits.length > 0 ? (
          <div className="border rounded-md shadow-sm overflow-hidden border-primary/80">
            <HabitTabs
              habits={habits}
              selectedHabitId={selectedHabitId}
              onSelectHabit={setSelectedHabitId}
            />

            <div className="px-4 py-2">
              {selectedHabit ? (
                <HabitContainer habit={selectedHabit} />
              ) : (
                <p className="text-center text-muted-foreground">
                  Select a habit to track
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md bg-muted/10">
            <p className="text-muted-foreground mb-2">No habits added yet.</p>
            <p className="text-sm">
              Add your first habit above to get started!
            </p>
          </div>
        )}
      </main>

      {/* <footer className="text-center text-sm text-muted-foreground">
        <p className="italic">Soli deo gloria ✝️</p>
      </footer> */}
    </div>
  );
}
