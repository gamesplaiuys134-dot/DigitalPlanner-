import React from "react";
import { Check, Download, FileText, CheckCircle2, Calendar } from "lucide-react";
import { PLANNER_FEATURES, DIGITAL_PLANNER_URL } from "../config";

interface DigitalPlannerCardProps {
  onUnlockClick: () => void;
  isUnlocked: boolean;
  remainingCopies?: number;
}

export const DigitalPlannerCard: React.FC<DigitalPlannerCardProps> = ({
  onUnlockClick,
  isUnlocked,
  remainingCopies,
}) => {
  return (
    <div
      id="digital-planner-offer"
      className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-md sm:shadow-lg overflow-hidden transition-all duration-300"
    >
      {/* Top Header Ribbon */}
      <div className="bg-gradient-to-r from-[#14213D] via-[#1E293B] to-[#14213D] px-3.5 sm:px-5 py-2 sm:py-2.5 text-white flex items-center justify-between text-[11px] sm:text-xs font-bold flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-gray-100 font-extrabold tracking-wide">
            Digital Planner 2027
          </span>
          {typeof remainingCopies === "number" && (
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-300 px-2 py-0.5 rounded shadow-xs inline-flex items-center gap-1">
              <span>LIMITED COPIES:</span>
              <span className="font-extrabold">{remainingCopies} LEFT</span>
            </span>
          )}
        </div>
        <span className="text-emerald-400 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Ready-Made PDF
        </span>
      </div>

      <div className="p-3.5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-center">
          
          {/* Tablet Mockup */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[160px] sm:max-w-[230px] aspect-[3/4] bg-slate-900 rounded-[18px] sm:rounded-[22px] p-2 sm:p-2.5 shadow-lg border-2 border-slate-700/80 relative">
              {/* Tablet Camera */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-800"></div>

              {/* Tablet Screen */}
              <div className="w-full h-full bg-[#FAF9F6] rounded-[13px] sm:rounded-[16px] overflow-hidden flex flex-col relative text-slate-800 shadow-inner p-2 sm:p-2.5 select-none">
                {/* Tabs on right */}
                <div className="absolute right-0 top-6 bottom-3 w-3.5 flex flex-col justify-between py-0.5 z-10 text-[5px] sm:text-[6px] font-bold text-white uppercase text-center">
                  <div className="bg-rose-400 rounded-l py-0.5">JAN</div>
                  <div className="bg-amber-500 rounded-l py-0.5">FEB</div>
                  <div className="bg-emerald-500 rounded-l py-0.5">MAR</div>
                  <div className="bg-blue-500 rounded-l py-0.5">APR</div>
                  <div className="bg-indigo-500 rounded-l py-0.5">GOAL</div>
                  <div className="bg-purple-500 rounded-l py-0.5">HABIT</div>
                </div>

                {/* Page content */}
                <div className="pr-3.5 flex-1 flex flex-col text-[7px] sm:text-[8px] leading-tight">
                  <div className="border-b border-slate-300 pb-0.5 mb-1 flex justify-between items-center">
                    <div>
                      <div className="font-extrabold text-[9px] sm:text-[10px] text-[#14213D]">DAILY PLANNER</div>
                      <div className="text-[6px] sm:text-[7px] text-gray-500">2027 EDITION</div>
                    </div>
                    <span className="bg-blue-600 text-white font-bold text-[6px] sm:text-[7px] px-1 py-0.2 rounded">
                      TODAY
                    </span>
                  </div>

                  {/* Priorities */}
                  <div className="bg-amber-50 border border-amber-200 rounded p-1 mb-1 text-[6px] sm:text-[7px]">
                    <div className="font-bold text-amber-900 mb-0.5">Top 3 Priorities</div>
                    <div className="space-y-0.5 text-slate-700">
                      <div>Complete focus block</div>
                      <div>Review habit streaks</div>
                      <div>Workout &amp; hydration</div>
                    </div>
                  </div>

                  {/* Schedule & Habits */}
                  <div className="grid grid-cols-2 gap-1 flex-1 text-[6px] sm:text-[7px]">
                    <div className="bg-white border border-slate-200 rounded p-0.5 sm:p-1">
                      <div className="font-bold border-b border-slate-100 pb-0.2 mb-0.5">Schedule</div>
                      <div className="space-y-0.2 text-slate-500">
                        <div>07:00 Morning</div>
                        <div className="text-blue-600 font-semibold">09:00 Deep Work</div>
                        <div>12:30 Lunch</div>
                        <div>18:00 Exercise</div>
                      </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded p-0.5 sm:p-1">
                      <div className="font-bold border-b border-slate-100 pb-0.2 mb-0.5">Habits</div>
                      <div className="space-y-0.2 text-emerald-700 font-medium">
                        <div>Read 20m</div>
                        <div>No Sugar</div>
                        <div>10k Steps</div>
                        <div>Hydrate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="mt-1.5 text-[10px] sm:text-[11px] text-gray-400 font-medium">
              GoodNotes • Notability • PDF Readers
            </span>
          </div>

          {/* Details & CTA */}
          <div className="md:col-span-7 flex flex-col justify-center">
            
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#14213D] tracking-tight mb-1">
              Digital Planner 2027
            </h2>

            <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed mb-2.5">
              Organize your daily tasks, set meaningful goals, track your habits, manage your schedule, and stay focused throughout the year.
            </p>

            {/* Compact feature list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] sm:text-xs text-gray-700 font-medium mb-2.5">
              {PLANNER_FEATURES.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Product Meta Pills */}
            <div className="grid grid-cols-3 gap-1.5 text-center mb-3 text-[10px] sm:text-xs font-bold">
              <div className="bg-slate-50 border border-slate-200 rounded-md py-1 px-1">
                <span className="text-[9px] uppercase text-gray-400 block font-semibold">Format</span>
                <span className="text-slate-800 flex items-center justify-center gap-1">
                  <FileText className="w-2.5 h-2.5 text-blue-600" /> PDF
                </span>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-md py-1 px-1">
                <span className="text-[9px] uppercase text-emerald-600 block font-semibold">Price</span>
                <span className="text-emerald-700 font-extrabold">FREE</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-md py-1 px-1">
                <span className="text-[9px] uppercase text-gray-400 block font-semibold">Access</span>
                <span className="text-slate-800">Instant</span>
              </div>
            </div>

            {/* Main CTA Button */}
            {!isUnlocked && typeof remainingCopies === "number" && (
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200/90 rounded-lg px-2.5 py-1 mb-2 shadow-2xs">
                <span className="flex items-center gap-1.5 uppercase text-[10px] tracking-wide text-amber-950 font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  <span>LIMITED COPIES</span>
                </span>
                <span className="text-amber-800 font-extrabold text-[11px]">
                  Only {remainingCopies} remaining
                </span>
              </div>
            )}

            {isUnlocked ? (
              <a
                href={DIGITAL_PLANNER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-white text-xs sm:text-sm bg-[#22B36B] hover:bg-[#1ca05e] transition-all shadow-md text-center cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>UNLOCKED — OPEN DIGITAL PLANNER</span>
              </a>
            ) : (
              <button
                onClick={onUnlockClick}
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl font-extrabold text-white text-xs sm:text-base shadow-md shadow-emerald-600/20 bg-[#22B36B] hover:bg-[#1ca05e] transition-all transform active:scale-[0.99] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD FREE DIGITAL PLANNER</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
