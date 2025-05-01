import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingStore {
  hasSeenOnboarding: boolean;
  markOnboardingAsSeen: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      markOnboardingAsSeen: () => set({ hasSeenOnboarding: true }),
      resetOnboarding: () => set({ hasSeenOnboarding: false }),
    }),
    {
      name: "onboarding-storage",
    }
  )
);
