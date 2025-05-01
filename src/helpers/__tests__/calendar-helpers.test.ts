import {
  getCalendarDays,
  formatDateKey,
  isCurrentMonth,
  isToday,
  isPastDay,
  getStatusClass,
  getStatusEmoji,
} from "../calendar-helpers";
import { Habit, HabitStatus } from "@/types/habit";

describe("Calendar Helpers", () => {
  // Mocking date for consistent testing
  const mockToday = new Date("2025-05-01");
  let originalDate: DateConstructor;

  beforeAll(() => {
    originalDate = global.Date;
    // @ts-expect-error - Mock the Date constructor
    global.Date = class extends Date {
      constructor(...args: unknown[]) {
        if (args.length === 0) {
          super(mockToday);
        } else {
          // This cast is necessary for the mock
          // We know this is safe in the test context
          super(...(args as []));
        }
      }
    };
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  // Create a type-safe test habit
  const testHabit: Habit = {
    id: "habit-1746104480314",
    name: "Gym",
    createdAt: "2025-05-01",
    entries: {
      "2025-04-13": "done",
      "2025-04-14": "done",
      "2025-04-15": "done",
      "2025-04-16": "done",
      "2025-04-17": "done",
      "2025-04-18": "done",
      "2025-04-19": "done",
      "2025-04-20": "done",
      "2025-04-21": "done",
      "2025-04-22": "done",
      "2025-04-23": "done",
      "2025-04-24": "done",
      "2025-04-25": "done",
      "2025-04-26": "done",
      "2025-04-27": "done",
      "2025-04-28": "missed",
      "2025-04-29": "missed",
      "2025-04-30": "done",
      "2025-05-01": "done",
    } as Record<string, HabitStatus>,
    lockPastEntries: true,
  };

  describe("getCalendarDays", () => {
    it("should return 42 days for a month (6 weeks view)", () => {
      const result = getCalendarDays(new Date("2025-05-01"));
      expect(result.length).toBe(42);
    });

    it("should start with the appropriate padding days from the previous month", () => {
      const result = getCalendarDays(new Date("2025-05-01"));
      // May 1, 2025 is a Thursday, so calendar should start with 4 days from April
      // April 27, 28, 29, 30
      expect(result[0].getMonth()).toBe(3); // April is month 3 (0-indexed)
      expect(result[0].getDate()).toBe(27);
    });

    it("should end with the appropriate padding days from the next month", () => {
      const result = getCalendarDays(new Date("2025-05-01"));
      // Should contain days from June
      const lastDay = result[result.length - 1];
      expect(lastDay.getMonth()).toBe(5); // June is month 5 (0-indexed)
    });
  });

  describe("formatDateKey", () => {
    it("should format a date to YYYY-MM-DD", () => {
      const date = new Date("2025-05-15");
      expect(formatDateKey(date)).toBe("2025-05-15");
    });

    it("should pad single digit months and days with a leading zero", () => {
      const date = new Date("2025-01-02");
      expect(formatDateKey(date)).toBe("2025-01-02");
    });
  });

  describe("isCurrentMonth", () => {
    it("should return true for dates in the current month", () => {
      const currentMonth = new Date("2025-05-15");
      const date = new Date("2025-05-01");
      expect(isCurrentMonth(date, currentMonth)).toBe(true);
    });

    it("should return false for dates not in the current month", () => {
      const currentMonth = new Date("2025-05-15");
      const date = new Date("2025-06-01");
      expect(isCurrentMonth(date, currentMonth)).toBe(false);
    });
  });

  describe("isToday", () => {
    it("should return true for today", () => {
      const today = new Date("2025-05-01");
      expect(isToday(today)).toBe(true);
    });

    it("should return false for other days", () => {
      const otherDay = new Date("2025-05-02");
      expect(isToday(otherDay)).toBe(false);
    });
  });

  describe("isPastDay", () => {
    it("should return true for days in the past", () => {
      const pastDay = new Date("2025-04-30");
      expect(isPastDay(pastDay)).toBe(true);
    });

    it("should return false for today", () => {
      const today = new Date("2025-05-01");
      expect(isPastDay(today)).toBe(false);
    });

    it("should return false for future days", () => {
      const futureDay = new Date("2025-05-02");
      expect(isPastDay(futureDay)).toBe(false);
    });
  });

  describe("getStatusClass", () => {
    it("should return bg-done for completed days", () => {
      const date = new Date("2025-04-30");
      expect(getStatusClass(date, testHabit)).toBe("bg-done text-white");
    });

    it("should return bg-missed for missed days", () => {
      const date = new Date("2025-04-28");
      expect(getStatusClass(date, testHabit)).toBe("bg-missed text-white");
    });

    it("should return bg-transparent for days with no status", () => {
      const date = new Date("2025-03-01");
      expect(getStatusClass(date, testHabit)).toBe("bg-transparent");
    });
  });

  describe("getStatusEmoji", () => {
    it("should return ✅ for completed days", () => {
      const date = new Date("2025-04-30");
      expect(getStatusEmoji(date, testHabit)).toBe("✅");
    });

    it("should return ❌ for missed days", () => {
      const date = new Date("2025-04-28");
      expect(getStatusEmoji(date, testHabit)).toBe("❌");
    });

    it("should return empty string for days with no status", () => {
      const date = new Date("2025-03-01");
      expect(getStatusEmoji(date, testHabit)).toBe("");
    });
  });
});
