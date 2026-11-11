import React from "react";
import { Sparkles, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  onSelectPlanner?: () => void;
  onSelectPrompt?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="text-center pt-1.5 sm:pt-4 pb-0.5 px-2 max-w-[850px] mx-auto">
      {/* Small badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 shadow-xs">
        <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" />
        <span>FREE PRODUCTIVITY TOOLKIT</span>
      </div>

      {/* Main headline */}
      <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] tracking-tight leading-[1.15] mb-1">
        Plan Your Days.{" "}
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Build Better Habits.
        </span>{" "}
        Achieve More.
      </h1>

      {/* Subtitle */}
      <p className="text-[11px] sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed mb-2">
        Take control of your daily routine with our free Digital Planner and personalized Habit Tracker generator.
      </p>

      {/* Trust indicator */}
      <div className="inline-flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-full shadow-xs">
        <span className="text-gray-700 flex items-center gap-1 font-bold">
          <CheckCircle2 className="w-3 h-3 text-blue-600" />
          <span>Free</span>
        </span>
        <span className="text-gray-300">|</span>
        <span className="text-emerald-600 font-bold flex items-center gap-1">
          <Zap className="w-3 h-3" />
          <span>Instant Access</span>
        </span>
        <span className="text-gray-300">|</span>
        <span className="text-blue-600 font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>Easy to Use</span>
        </span>
      </div>
    </section>
  );
};
