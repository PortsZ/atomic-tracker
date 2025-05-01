## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# atomic-tracker

## Overview

A simple habit tracker inspired by "Atomic Habits" by James Clear, designed to encourage daily habit-building.

## Features

- Interactive calendar with easy toggling between done, missed, and pending states.
- Visual progress tracking toward a 90-day habit formation goal.
- Inspirational quotes from Atomic Habits, updated dynamically as users progress.
- Past date edit locking with explicit user consent for unlocking.

## Architecture & Design Choices

- Reusable shadcn components: easy to maintain and extend.
- Hooks for state logic: maintainable, testable, and modular.
- JSON in-memory storage for quick MVP and simplicity.
- Jest for testing

## Future possible Improvements

- Database storage
- User authentication
- Time and task tracking
- Advanced analytics and habit insights
- Advanced habit research to improve actionable insights. (e.g. change 90 days to whatever is best for the habit that the user is trying to create)
- grab the habits from the (future) tasks component and suggest to track it, or get tracking from the user task management,
- add whats app integration for convenient logging through the user's phone (maybe implement image logging for things like gym and diet progress)

### Future research for improvements

    The study also showed that the time it took to form a habit ranged from 18 to 254 days, highlighting the variability.
    Factors influencing habit formation:
    Several factors can influence how long it takes to build a new habit, including:
    The nature of the habit: Simple habits, like drinking more water, may form faster than complex habits, like exercising regularly.
    Personal motivation: Individuals who are highly motivated to change a habit may find it easier to form.
    The environment: A supportive environment can make it easier to develop and maintain a new habit.
    Consistency is key:
    Regardless of the specific timeframe, consistency and repeated action are essential for habit formation.

## Technical Stack

- Next.js
- Tailwind CSS
- Zustand for state management
- Shadcn for great components we could change later and beautiful ui fast.
- React state/hooks and Zustand (no database, using JSON in-memory storage)

## Setup Instructions

```bash
git clone [repo_url]
npm install
npm run dev
```

## Useful Links:

- [Excalidraw](https://link.excalidraw.com/l/9xENFG3oEy/vzn0rZCBMt)
- [Thought process in GPT](https://chatgpt.com/share/681397b9-8598-8005-9657-13a6196c3cb7)
- [Deployment](https://atomic-tracker-beta.vercel.app/)
- [Video](https://youtu.be/aWsMT5vywoA)

## In-depth Architecture & Key Components

### `src/app/page.tsx`

- **Role**: Main dashboard & entry point.
- **Features**:
  - Loads habits (`useHabitStore`) and onboarding state (`useOnboardingStore`).
  - New-habit dialog (via `AddHabitForm`).
  - Habit selector tabs (`HabitTabs`) + selected habit view (`HabitContainer`).
  - Theme switcher (`ThemeToggle`) and first-run tutorial (`OnboardingDialog`).

### `src/components/HabitTabs.tsx`

- **Role**: Horizontal list of habit names.
- **Features**:
  - Select or delete a habit.
  - Confirm deletion in a modal.
  - Auto-selects the next habit if you delete the current one.

### `src/components/HabitContainer.tsx`

- **Role**: Displays a single habit’s details.
- **Layout**:
  - **Left (w-2/5)**: Stats cards (`HabitCard`) + `MotivationalMessage`.
  - **Right (w-3/5)**: Interactive calendar (`HabitCalendar`).

### `src/components/AddHabitForm.tsx`

- **Role**: Modal form to add a new habit.
- **Features**:
  - Name input with validation.
  - Calls `addHabit` (Zustand) on submit.

### `src/components/ThemeToggle.tsx`

- **Role**: Dropdown to switch UI themes.
- **Features**:
  - Uses `useTheme` to read/set light, dark, sunrise, or royal.
  - Client-only render to avoid hydration mismatch.

### `src/components/OnboardingDialog.tsx`

- **Role**: First-time user walkthrough.
- **Features**:
  - Multi-step tips (icons + copy).
  - “Previous”/“Next” navigation, “Get Started” on final step.
  - Marks onboarding complete in `useOnboardingStore`.

### `src/components/ui/dialog.tsx`

- **Role**: Reusable modal primitives.
- **Features**:
  - Wraps Radix UI’s `<Dialog>` components.
  - Standardized styling via `cn` and Tailwind.

---

> **Note**: Other UI primitives (buttons, selects, icons) are built under `src/components/ui/…` following the same Radix + Tailwind patterns with ShadCn lib.  
> `HabitCard`, `HabitCalendar`, and `MotivationalMessage` each encapsulate one piece of the dashboard.
