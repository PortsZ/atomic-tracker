export function getMotivationalMessage(percentage: number): string {
  if (percentage <= 20) {
    return "You're in the valley of disappointment, keep going!";
  } else if (percentage <= 40) {
    return "Your identity is shifting, persistence is key.";
  } else if (percentage <= 60) {
    return "Momentum is building, your systems are working!";
  } else if (percentage <= 80) {
    return "Habits now feel natural, keep refining your routine.";
  } else if (percentage <= 100) {
    return "Habit mastery approaching, your new identity is clear.";
  } else {
    return "Time to overcharge your habits!";
  }
}
