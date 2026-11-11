import React from "react";
import { Clock, TrendingUp, Users } from "lucide-react";
import { useScarcity, ScarcityData } from "../hooks/useScarcity";

interface ScarcityCounterProps {
  initialCopies?: number;
  scarcityData?: ScarcityData;
}

export const ScarcityCounter: React.FC<ScarcityCounterProps> = ({
  initialCopies = 24,
  scarcityData,
}) => {
  const fallbackScarcity = useScarcity(initialCopies);
  const {
    remainingCopies,
    hasDecreased,
    activeViewers,
    percentageClaimed,
  } = scarcityData || fallbackScarcity;

  return (
    <div className="w-full bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 rounded-xl border border-amber-200/90 p-3 sm:p-3.5 shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* Left: Limited Allocation Header */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
            <Clock className="w-3.5 h-3.5" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-950 bg-amber-200/90 border border-amber-300 px-2 py-0.5 rounded shadow-2xs">
                <span>LIMITED COPIES:</span>
                <span
                  className={`px-1.5 py-0.2 rounded font-black text-amber-900 bg-white/90 shadow-2xs transition-all duration-300 ${
                    hasDecreased ? "scale-110 bg-rose-200 text-rose-800" : "scale-100"
                  }`}
                >
                  {remainingCopies} LEFT
                </span>
              </span>
              <span className="text-[11px] text-gray-500 flex items-center gap-1 font-medium">
                <Users className="w-3 h-3 text-blue-600 inline" />
                <span>{activeViewers} viewing now</span>
              </span>
            </div>

            <h3 className="text-xs sm:text-sm font-extrabold text-[#14213D] leading-tight mt-1">
              Only{" "}
              <span
                className={`inline-block px-1.5 py-0.2 rounded font-black text-amber-700 bg-amber-100 transition-all duration-300 ${
                  hasDecreased ? "scale-125 bg-rose-200 text-rose-800" : "scale-100"
                }`}
              >
                {remainingCopies}
              </span>{" "}
              free copies remaining for today
            </h3>
          </div>
        </div>

        {/* Right: Progress bar & percentage */}
        <div className="w-full sm:w-56 flex flex-col justify-center">
          <div className="flex justify-between text-[10px] font-bold text-gray-600 mb-1">
            <span className="flex items-center gap-1 text-emerald-700">
              <TrendingUp className="w-3 h-3 inline" />
              <span>{percentageClaimed}% Claimed</span>
            </span>
            <span className="text-amber-800 font-extrabold">{remainingCopies} left</span>
          </div>

          <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentageClaimed}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
