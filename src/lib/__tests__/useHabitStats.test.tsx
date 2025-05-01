import { renderHook } from "@testing-library/react";
import { useHabitStats } from "../useHabitStats";
import { Habit, HabitStatus } from "@/types/habit";

describe("useHabitStats", () => {
  // Helper function to create test habits with specific entries
  const createTestHabit = (entries: Record<string, HabitStatus>): Habit => ({
    id: "test-habit-id",
    name: "Test Habit",
    createdAt: "2025-04-01",
    entries,
    lockPastEntries: true,
  });

  it("should calculate current streak correctly", () => {
    // Current streak of 3 days
    const habit = createTestHabit({
      "2025-04-28": "missed",
      "2025-04-29": "done",
      "2025-04-30": "done",
      "2025-05-01": "done",
    });

    const { result } = renderHook(() => useHabitStats(habit));
    expect(result.current.currentStreak).toBe(3);
  });

  it("should break current streak on missed days", () => {
    // Streak broken by missed day
    const habit = createTestHabit({
      "2025-04-28": "done",
      "2025-04-29": "done",
      "2025-04-30": "missed",
      "2025-05-01": "done",
    });

    const { result } = renderHook(() => useHabitStats(habit));
    expect(result.current.currentStreak).toBe(1); // Only today counts
  });

  it("should calculate longest streak correctly", () => {
    // Longest streak of 5 days, current streak of 2
    const habit = createTestHabit({
      "2025-04-20": "done",
      "2025-04-21": "done",
      "2025-04-22": "done",
      "2025-04-23": "done",
      "2025-04-24": "done",
      "2025-04-25": "missed",
      "2025-04-26": "missed",
      "2025-04-27": "missed",
      "2025-04-28": "missed",
      "2025-04-29": "missed",
      "2025-04-30": "done",
      "2025-05-01": "done",
    });

    const { result } = renderHook(() => useHabitStats(habit));
    expect(result.current.longestStreak).toBe(5);
  });

  it("should calculate completion percentage correctly", () => {
    // 10 completed days out of 90-day goal (11.11%)
    const entries: Record<string, HabitStatus> = {};
    for (let i = 1; i <= 30; i++) {
      const date = `2025-04-${i.toString().padStart(2, "0")}`;
      entries[date] = i <= 10 ? "done" : "missed";
    }

    const habit = createTestHabit(entries);
    const { result } = renderHook(() => useHabitStats(habit));
    expect(result.current.completionPercentage).toBe(11); // 10/90 = 11.11%, rounded to 11
  });

  it("should calculate monthly score correctly", () => {
    // Set up entries in multiple months, but only May should count
    const habit = createTestHabit({
      // April entries (shouldn't count for May)
      "2025-04-29": "done",
      "2025-04-30": "done",
      // May entries (should count)
      "2025-05-01": "done",
      "2025-05-02": "done",
      "2025-05-03": "done",
      // June entries (shouldn't count for May)
      "2025-06-01": "done",
    });

    // Mock date to be in May for consistent testing
    const originalDate = global.Date;
    const mockDate = new Date("2025-05-15");

    // @ts-expect-error - Mocking the Date constructor
    global.Date = class extends Date {
      constructor(...args: unknown[]) {
        if (args.length === 0) {
          super(mockDate);
        } else {
          // This cast is necessary for the mock
          // We know this is safe in the test context
          super(...(args as []));
        }
      }
    };

    try {
      const { result } = renderHook(() => useHabitStats(habit));
      expect(result.current.monthlyScore).toBe(3); // Only May entries
    } finally {
      global.Date = originalDate; // Restore original Date
    }
  });

  it("should calculate consistency rating correctly", () => {
    // 15 completed days out of 30 total days (50%)
    const entries: Record<string, HabitStatus> = {};
    for (let i = 1; i <= 30; i++) {
      const date = `2025-04-${i.toString().padStart(2, "0")}`;
      entries[date] = i <= 15 ? "done" : "missed";
    }

    const habit = createTestHabit(entries);
    const { result } = renderHook(() => useHabitStats(habit));
    expect(result.current.consistencyRating).toBe(50); // 15/30 = 50%
  });

  it("should return 0 for consistency rating when there are no days since start", () => {
    // Empty habit with no entries
    const habit = createTestHabit({});

    const { result } = renderHook(() => useHabitStats(habit));
    expect(result.current.consistencyRating).toBe(0);
  });
});
