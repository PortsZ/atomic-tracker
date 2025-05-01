"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHabitStore } from "@/lib/store";

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Habit</CardTitle>
      </CardHeader>
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
    </Card>
  );
}
