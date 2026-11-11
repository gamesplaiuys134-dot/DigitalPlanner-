import React from "react";
import { MousePointerClick, ShieldCheck, DownloadCloud } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "../config";

const stepIcons = [
  <MousePointerClick key="1" className="w-4 h-4 text-blue-600" />,
  <ShieldCheck key="2" className="w-4 h-4 text-amber-500" />,
  <DownloadCloud key="3" className="w-4 h-4 text-emerald-600" />,
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-2 sm:py-4 px-1 sm:px-3 max-w-[850px] mx-auto text-center">
      <h3 className="text-base sm:text-2xl font-extrabold text-[#14213D] tracking-tight mb-2 sm:mb-3">
        How It Works
      </h3>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-left">
        {HOW_IT_WORKS_STEPS.map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200/90 shadow-2xs flex items-center sm:flex-col sm:items-start gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              {stepIcons[idx]}
            </div>

            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] font-black text-blue-600 uppercase tracking-wider">
                STEP {step.step}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#14213D] leading-tight">
                {step.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-tight mt-0.5">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
