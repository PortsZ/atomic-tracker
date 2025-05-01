import React, { useState, useEffect } from "react";
import { useOnboardingStore } from "@/stores/onboardingStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  PlusCircle,
  Calendar,
  BarChart,
  LockIcon,
  Settings,
} from "lucide-react";

interface OnboardingStep {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Atomic Habit Tracker!",
    description: (
      <div className="space-y-2">
        <p>
          This app helps you build good habits and break bad ones by tracking
          your daily progress. Based on James Clear&apos;s book &ldquo;Atomic
          Habits&rdquo;, we focus on small, consistent improvements that
          compound over time.
        </p>
        <p className="text-sm text-muted-foreground">
          Let&apos;s quickly go through how to use the app.
        </p>
      </div>
    ),
    icon: <CheckCircle className="w-16 h-16 text-primary" />,
  },
  {
    title: "Create New Habits",
    description: (
      <div className="space-y-2">
        <p>
          Start by creating a new habit you want to track. Click the
          &ldquo;Create a new habit&rdquo; button at the top of the app.
        </p>
        <p className="text-sm text-muted-foreground">
          Give your habit a name that&apos;s meaningful to you.
        </p>
      </div>
    ),
    icon: <PlusCircle className="w-16 h-16 text-primary" />,
  },
  {
    title: "Track Daily Progress",
    description: (
      <div className="space-y-2">
        <p>For each day, you can mark your habit as:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Completed (✅ click once on the day)</li>
          <li>Failed (❌ click twice on the day)</li>
          <li>Clear (⏭️ click three times on the day)</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Consistency is key to building lasting habits!
        </p>
      </div>
    ),
    icon: <Calendar className="w-16 h-16 text-primary" />,
  },
  {
    title: "See Your Progress",
    description: (
      <div className="space-y-2">
        <p>The app will automatically calculate your:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Completion rate</li>
          <li>Monthly score</li>
          <li>Consistency rating</li>
          <li>Current streak</li>
          <li>Longest streak</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Watch as your small daily improvements compound over time!
        </p>
      </div>
    ),
    icon: <BarChart className="w-16 h-16 text-primary" />,
  },
  {
    title: "Lock Past Entries",
    description: (
      <div className="space-y-2">
        <p>By default, past entries are locked to encourage honesty.</p>
        <p>
          However, you can toggle this feature off if you need to update
          previous days&apos; statuses.
        </p>
        <p className="text-sm text-muted-foreground">
          Being honest with yourself is essential for real habit formation.
        </p>
      </div>
    ),
    icon: <LockIcon className="w-16 h-16 text-primary" />,
  },
  {
    title: "You're All Set!",
    description: (
      <div className="space-y-2">
        <p>
          You&apos;re now ready to start building better habits with Atomic
          Habit Tracker!
        </p>
        <p>
          Remember: Small improvements compound over time to create remarkable
          results.
        </p>
        <p className="text-sm font-semibold text-primary">
          &ldquo;Every action you take is a vote for the type of person you wish
          to become.&rdquo;
        </p>
      </div>
    ),
    icon: <Settings className="w-16 h-16 text-primary" />,
  },
];

export const OnboardingDialog = () => {
  const [open, setOpen] = useState(false);
  const { hasSeenOnboarding, markOnboardingAsSeen } = useOnboardingStore();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!hasSeenOnboarding) {
      setOpen(true);
    }
  }, [hasSeenOnboarding]);

  const handleClose = () => {
    setOpen(false);
    markOnboardingAsSeen();
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">{currentStepData.icon}</div>
          <DialogTitle className="text-xl text-center">
            {currentStepData.title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">{currentStepData.description}</div>
        <div className="flex justify-center my-2">
          <div className="flex gap-1">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full w-6 ${
                  index === currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between gap-2">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex gap-1 items-center"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>
          <Button onClick={nextStep} className="flex gap-1 items-center">
            {currentStep === onboardingSteps.length - 1 ? (
              "Get Started"
            ) : (
              <>
                Next <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
