import React from "react";
import { Check, Bot, CheckCircle2, Sparkles } from "lucide-react";
import { HABIT_PROMPT_FEATURES } from "../config";

interface HabitTrackerPromptCardProps {
  onUnlockClick: () => void;
  isUnlocked: boolean;
}

export const HabitTrackerPromptCard: React.FC<HabitTrackerPromptCardProps> = ({
  onUnlockClick,
  isUnlocked,
}) => {
  return (
    <div
      id="habit-tracker-offer"
      className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-purple-50/60 rounded-xl sm:rounded-2xl border border-blue-200 shadow-md sm:shadow-lg overflow-hidden transition-all duration-300"
    >
      {/* Top Header Ribbon */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 px-3.5 sm:px-5 py-2 sm:py-2.5 text-white flex items-center justify-between text-[11px] sm:text-xs font-bold">
        <div className="flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-white font-extrabold tracking-wide">
            Habit Tracker Generator
          </span>
        </div>
        <span className="text-blue-200 text-[10px] sm:text-[11px] font-semibold bg-white/10 px-2 py-0.5 rounded-full">
          ChatGPT &amp; Gemini Ready
        </span>
      </div>

      <div className="p-3.5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-center">
          
          {/* AI Terminal Graphic */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[200px] sm:max-w-[240px] bg-slate-900 rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-md border border-slate-700 text-slate-100 font-mono text-[9px] sm:text-[10px] relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[8px] sm:text-[9px] text-slate-400">habit-prompt.ai</span>
              </div>

              <div className="space-y-1 text-slate-300">
                <div className="text-amber-400 font-bold">&gt; ROLE: Habit Architect</div>
                <div className="text-purple-300 text-[8px] sm:text-[9px]">// 6 Diagnostic Questions:</div>
                <div className="text-emerald-400 text-[8px] sm:text-[9px] pl-1">• Goals &amp; Energy Peak</div>
                <div className="text-emerald-400 text-[8px] sm:text-[9px] pl-1">• Morning Power Routine</div>
                <div className="text-emerald-400 text-[8px] sm:text-[9px] pl-1">• Habit Stacking Formula</div>
                <div className="text-emerald-400 text-[8px] sm:text-[9px] pl-1">• Weekly Grid Template</div>
              </div>

              <div className="mt-2 pt-1 border-t border-slate-800 text-[7px] sm:text-[8px] text-blue-400 flex justify-between">
                <span>Personalized habit plan</span>
                <span className="font-bold">v3.5+</span>
              </div>
            </div>

            <span className="mt-1 text-[10px] sm:text-[11px] text-gray-400 font-medium">
              Copy &amp; paste into any AI model
            </span>
          </div>

          {/* Details & CTA */}
          <div className="md:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 self-start">
              <Bot className="w-2.5 h-2.5 text-blue-600" />
              <span>AI-Powered Personalization</span>
            </div>

            <h2 className="text-lg sm:text-2xl font-extrabold text-[#14213D] tracking-tight mb-1">
              Create Your Own Personalized Habit Tracker!
            </h2>

            <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed mb-2.5">
              Want something more personal? Get our specially designed AI prompt and create a Habit Tracker tailored to your lifestyle, personal goals, and daily routine.
            </p>

            {/* Compact feature list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] sm:text-xs text-gray-700 font-medium mb-3">
              {HABIT_PROMPT_FEATURES.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            {isUnlocked ? (
              <a
                href="#prompt-section"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-white text-xs sm:text-sm bg-[#2563EB] hover:bg-blue-700 transition-all shadow-md text-center cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>UNLOCKED — VIEW &amp; COPY PROMPT</span>
              </a>
            ) : (
              <button
                onClick={onUnlockClick}
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl font-extrabold text-white text-xs sm:text-base shadow-md shadow-blue-600/25 bg-gradient-to-r from-[#2563EB] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all transform active:scale-[0.99] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>GET MY PERSONALIZED HABIT TRACKER PROMPT</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
