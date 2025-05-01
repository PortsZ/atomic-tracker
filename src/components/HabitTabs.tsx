"use client";

import { useState } from "react";
import { Habit } from "@/types/habit";
import { useHabitStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HabitTabsProps {
  habits: Habit[];
  selectedHabitId: string | null;
  onSelectHabit: (id: string) => void;
}

export function HabitTabs({
  habits,
  selectedHabitId,
  onSelectHabit,
}: HabitTabsProps) {
  const [habitToDelete, setHabitToDelete] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deleteHabit } = useHabitStore();

  const handleDeleteClick = (habitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHabitToDelete(habitId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete);
      setShowDeleteDialog(false);
      setHabitToDelete(null);

      // If we're deleting the currently selected habit, select another one if available
      if (habitToDelete === selectedHabitId && habits.length > 1) {
        const remainingHabits = habits.filter((h) => h.id !== habitToDelete);
        if (remainingHabits.length > 0) {
          onSelectHabit(remainingHabits[0].id);
        }
      }
    }
  };

  return (
    <>
      <div className="flex overflow-x-auto gap-1 pb-0 border-b border-primary/80 relative">
        {habits.map((habit) => (
          <div
            key={habit.id}
            onClick={() => onSelectHabit(habit.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-t-md cursor-pointer min-w-[120px] 
              transition-all duration-200 relative
              ${
                selectedHabitId === habit.id
                  ? "bg-background text-foreground border-x border-t border-primary/40 font-medium"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }
            `}
          >
            <span className="truncate">{habit.name}</span>
            <button
              onClick={(e) => handleDeleteClick(habit.id, e)}
              className="opacity-60 hover:opacity-100 hover:text-destructive focus:outline-none ml-auto"
              aria-label="Delete habit"
            >
              <X size={14} />
            </button>
            {selectedHabitId === habit.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-background z-10" />
            )}
          </div>
        ))}
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Habit</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this habit? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
