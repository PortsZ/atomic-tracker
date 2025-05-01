import React from "react";
import { Card } from "./ui/card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const motivationalQuotes = [
  "Every action you take is a vote for the type of person you wish to become.",
  "If you improve by 1% daily, you'll be 37x better by year's end.",
  "You do not rise to the level of your goals. You fall to the level of your systems.",
  "Habits are the compound interest of self-improvement.",
  "Success is the product of daily habits—not once-in-a-lifetime transformations.",
  "Your outcomes are a lagging measure of your habits.",
  "You should be far more concerned with your current trajectory than with your current results.",
  "The most effective form of motivation is progress.",
  "The purpose of setting goals is to win the game. The purpose of building systems is to continue playing the game.",
  "Small habits don't add up. They compound.",
];

const MotivationalMessage = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 20000, stopOnInteraction: false }),
  ]);

  return (
    <Card className="w-full mx-auto border-primary/80">
      <div className="overflow-hidden p-4" ref={emblaRef}>
        <div className="flex">
          {motivationalQuotes.map((quote, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <p className="text-center p-2 font-medium text-md">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MotivationalMessage;
