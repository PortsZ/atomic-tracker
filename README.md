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

- Atomic components: easy to maintain and extend.
- Hooks for state logic: maintainable, testable, and modular.
- JSON in-memory storage for quick MVP and simplicity.

## Future Improvements

- Database storage
- User authentication
- Time and task tracking
- Advanced analytics and habit insights
- Advanced habit research to improve actionable insights. (e.g. change 90 days to whatever is best for the habit the user is trying to create)
- grab the habits from the (future) tasks and suggest to track, or get tracking from the user task management,
- add whats app integration for convenient logging

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
- React state/hooks (no database, using JSON in-memory storage)

## Setup Instructions

```bash
git clone [repo_url]
npm install
npm run dev
```
