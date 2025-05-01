"use client";

import { useState } from "react";
import { useHabitStore } from "@/lib/store";

import { HabitContainer } from "@/components/HabitContainer";
import { HabitTabs } from "@/components/HabitTabs";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { AddHabitForm } from "@/components/AddHabitForm";
export default function Home() {
  const habits = useHabitStore((state) => state.habits);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(
    habits.length > 0 ? habits[0].id : null
  );

  const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-6 sm:p-16 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">🚀 Atomic Habit Tracker 🚀</h1>
        <Dialog>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Track your habits and build consistency{" "}
            <span>
              <DialogTrigger>
                <div className="flex items-center gap-2 border rounded-md p-2 border-gray-300 hover:bg-gray-100 transition-colors">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  add a new habit
                </div>
              </DialogTrigger>
            </span>
          </p>
          <DialogContent>
            <AddHabitForm />
          </DialogContent>
        </Dialog>
      </header>

      <main className="grid gap-4">
        {habits.length > 0 ? (
          <div className="border rounded-md shadow-sm overflow-hidden">
            <HabitTabs
              habits={habits}
              selectedHabitId={selectedHabitId}
              onSelectHabit={setSelectedHabitId}
            />

            <div className="p-4">
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

      <footer className="text-center text-sm text-muted-foreground">
        <p className="italic">Soli deo gloria ✝️</p>
      </footer>
    </div>
  );
}
