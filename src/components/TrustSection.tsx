import React from "react";
import { ShieldCheck, Gift, Zap, Smartphone } from "lucide-react";
import { TRUST_POINTS } from "../config";

const trustIcons: Record<string, React.ReactNode> = {
  Gift: <Gift className="w-3.5 h-3.5 text-amber-500" />,
  Zap: <Zap className="w-3.5 h-3.5 text-emerald-600" />,
  Smartphone: <Smartphone className="w-3.5 h-3.5 text-indigo-600" />,
  ShieldCheck: <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />,
};

export const TrustSection: React.FC = () => {
  return (
    <section className="py-1 sm:py-2 px-1 sm:px-3 max-w-[850px] mx-auto">
      <div className="bg-slate-50/90 rounded-lg sm:rounded-xl border border-slate-200/80 p-2.5 sm:p-3.5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-left">
          {TRUST_POINTS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                {trustIcons[item.icon]}
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold text-[#14213D] leading-tight truncate">
                  {item.title}
                </h4>
                <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight truncate">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
