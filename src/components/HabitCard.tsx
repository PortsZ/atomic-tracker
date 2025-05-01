"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useHabitStats } from "@/lib/useHabitStats";
import { getMotivationalMessage } from "@/lib/motivationalMessages";
import { Habit } from "@/types/habit";
import { useHabitStore } from "@/stores/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TrackablesCard from "./custom/TrackablesCard";

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);
  const [unlockInput, setUnlockInput] = useState("");
  const {
    currentStreak,
    longestStreak,
    completionPercentage,
    consistencyRating,
    monthlyScore,
  } = useHabitStats(habit);
  const motivationalMessage = getMotivationalMessage(completionPercentage);
  const { toggleLockPastEntries } = useHabitStore();

  const handleLockToggle = () => {
    if (habit.lockPastEntries) {
      // If currently locked, show dialog before unlocking
      setShowUnlockDialog(true);
    } else {
      // If currently unlocked, just lock without confirmation
      toggleLockPastEntries(habit.id);
    }
  };

  const handleUnlock = () => {
    if (unlockInput === "I understand") {
      toggleLockPastEntries(habit.id); // This will unlock past entries
      setShowUnlockDialog(false);
      setUnlockInput("");
    }
  };

  return (
    <>
      <Card className="w-full mx-auto border-primary/80">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{habit.name}</CardTitle>
          <div>
            <Button
              variant="outline"
              className="border-primary/60"
              size="sm"
              onClick={handleLockToggle}
            >
              {habit.lockPastEntries ? "🔓 Unlock" : "🔒 Lock"} Past Dates
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TrackablesCard>
                <p className="text-sm text-muted-foreground">
                  Monthly Scoreboard
                </p>
                <p className="text-2xl font-bold">
                  {monthlyScore} {monthlyScore === 1 ? "day " : "days "}
                </p>
                <p className="text-sm text-muted-foreground">
                  marked as done this month
                </p>
              </TrackablesCard>
              <TrackablesCard>
                <p className="text-sm text-muted-foreground">
                  Consistency Rating
                </p>
                <p className="text-2xl font-bold">{consistencyRating}%</p>
                <p className="text-sm text-muted-foreground">
                  you have been consistent for {consistencyRating}% of the
                  project
                </p>
              </TrackablesCard>
              <TrackablesCard>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">
                  {currentStreak} {currentStreak === 1 ? "day" : "days"}
                </p>
              </TrackablesCard>
              <TrackablesCard>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
                <p className="text-2xl font-bold">
                  {longestStreak} {longestStreak === 1 ? "day" : "days"}
                </p>
              </TrackablesCard>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Progress to 90-day goal</p>
                <p className="text-sm font-medium">{completionPercentage}%</p>
              </div>
              <Progress value={completionPercentage} className="h-4" />
            </div>

            <p className="text-sm italic mt-4 text-muted-foreground">
              &quot;{motivationalMessage}&quot;
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlock Past Dates</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Editing past entries is not recommended. True progress comes from
              honest reflection—changing history undermines your accountability,
              distorts your streaks, and weakens the habit-building process.
              Stay honest, track today only, or make changes only{" "}
              <span className="font-bold">if you really need to</span>.
            </p>
            <p>
              To edit past entries, please type{" "}
              <span className="font-bold">&quot;I understand&quot;</span>:
            </p>
            <input
              type="text"
              value={unlockInput}
              onChange={(e) => setUnlockInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type 'I understand' to continue"
            />
            <Button
              onClick={handleUnlock}
              disabled={unlockInput !== "I understand"}
              className="w-full"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
