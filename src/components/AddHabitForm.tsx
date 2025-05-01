"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useHabitStore } from "@/lib/store";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";

export function AddHabitForm() {
  const [habitName, setHabitName] = useState("");
  const { addHabit } = useHabitStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      addHabit(habitName.trim());
      setHabitName("");
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Habit</DialogTitle>
      </DialogHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="Enter habit name..."
            className="flex-1 p-2 border rounded"
          />
          <Button type="submit" disabled={!habitName.trim()}>
            Add Habit
          </Button>
        </form>
      </CardContent>
    </>
  );
}
