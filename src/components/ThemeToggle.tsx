"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SunIcon, MoonIcon, PaletteIcon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only mark as mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center">
      <Select
        // Before mounting, leave value undefined so server/client match
        value={mounted ? theme : undefined}
        onValueChange={(value) =>
          setTheme(value as "light" | "dark" | "system" | "sunrise" | "royal")
        }
      >
        <SelectTrigger className="w-[140px] h-8">
          <SelectValue placeholder="Select theme">
            {mounted ? (
              <div className="flex items-center gap-2">
                {theme === "light" && <SunIcon className="h-4 w-4" />}
                {theme === "dark" && <MoonIcon className="h-4 w-4" />}
                {(theme === "sunrise" || theme === "royal") && (
                  <PaletteIcon className="h-4 w-4" />
                )}
                <span className="capitalize">{theme}</span>
              </div>
            ) : (
              <span>Select theme</span>
            )}
          </SelectValue>
        </SelectTrigger>

        {mounted && (
          <SelectContent>
            <SelectItem value="light">
              <div className="flex items-center gap-2">
                <SunIcon className="h-4 w-4" />
                <span>Light</span>
              </div>
            </SelectItem>
            <SelectItem value="dark">
              <div className="flex items-center gap-2">
                <MoonIcon className="h-4 w-4" />
                <span>Dark</span>
              </div>
            </SelectItem>
            <SelectItem value="sunrise">
              <div className="flex items-center gap-2">
                <PaletteIcon className="h-4 w-4" color="#F59E0B" />
                <span>Sunrise</span>
              </div>
            </SelectItem>
            <SelectItem value="royal">
              <div className="flex items-center gap-2">
                <PaletteIcon className="h-4 w-4" color="#8B5CF6" />
                <span>Royal</span>
              </div>
            </SelectItem>
          </SelectContent>
        )}
      </Select>
    </div>
  );
}
