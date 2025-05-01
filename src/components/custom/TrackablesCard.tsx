"use client";
import { cn } from "@/lib/utils";
import React from "react";

const TrackablesCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-muted p-3 rounded-md border border-primary/80",
        className
      )}
    >
      {children}
    </div>
  );
};

export default TrackablesCard;
