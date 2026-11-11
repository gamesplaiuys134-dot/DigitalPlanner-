import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface HeaderBarProps {
  onScrollToOffers?: () => void;
  remainingCopies?: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ onScrollToOffers, remainingCopies }) => {
  return (
    <aside
      aria-label="Promotional Announcement"
      className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-xs py-2 px-3 text-center shrink-0"
    >
      <div className="max-w-[850px] mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold tracking-wide uppercase flex-wrap">
        <Sparkles className="w-3.5 h-3.5 text-amber-100" />
        <span>FREE DIGITAL PLANNER — 2027 EDITION</span>
        {typeof remainingCopies === "number" && (
          <span className="bg-black/20 text-white border border-white/25 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-2xs">
            <span>LIMITED COPIES:</span>
            <span className="text-amber-200">{remainingCopies}</span>
          </span>
        )}
        {onScrollToOffers ? (
          <button
            onClick={onScrollToOffers}
            className="hidden sm:inline-flex items-center gap-1 bg-white/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ml-1 hover:bg-white/30 cursor-pointer transition-colors"
          >
            <span>Claim Yours</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          <span className="hidden sm:inline bg-white/20 text-[11px] font-semibold px-2 py-0.5 rounded-full ml-1">
            Instant Access
          </span>
        )}
      </div>
    </aside>
  );
};
