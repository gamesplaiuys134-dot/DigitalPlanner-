import React, { useState, useEffect } from "react";
import { CheckCircle2, Download, X } from "lucide-react";

interface DownloadEvent {
  name: string;
  location: string;
  item: string;
  timeAgo: string;
}

const RECENT_DOWNLOADS: DownloadEvent[] = [
  { name: "Karim M.", location: "Casablanca", item: "Digital Planner 2027", timeAgo: "1m ago" },
  { name: "Sarah L.", location: "New York", item: "Digital Planner 2027", timeAgo: "2m ago" },
  { name: "Youssef B.", location: "Paris", item: "Habit Tracker Prompt", timeAgo: "3m ago" },
  { name: "Emma W.", location: "London", item: "Digital Planner 2027", timeAgo: "1m ago" },
  { name: "Omar D.", location: "Dubai", item: "Digital Planner 2027", timeAgo: "4m ago" },
  { name: "Lucas R.", location: "Montreal", item: "Habit Tracker Prompt", timeAgo: "2m ago" },
  { name: "Fatima Z.", location: "Rabat", item: "Digital Planner 2027", timeAgo: "Just now" },
  { name: "Alex K.", location: "Berlin", item: "Digital Planner 2027", timeAgo: "3m ago" },
];

export const SocialProofToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial toast after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Loop through notifications: show for 5.5s, hide for 4s, then show next
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_DOWNLOADS.length);
        setIsVisible(true);
      }, 3500);
    }, 9500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = RECENT_DOWNLOADS[currentIndex];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-3 left-3 right-3 sm:right-auto sm:left-4 z-40 sm:max-w-xs transition-all duration-500 transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-4 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 border border-gray-200 shadow-xl flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#14213D] truncate">
              <span>{current.name}</span>
              <span className="text-[10px] font-normal text-gray-500">({current.location})</span>
            </div>
            <div className="text-[11px] text-gray-600 truncate flex items-center gap-1">
              <Download className="w-2.5 h-2.5 text-emerald-600 inline shrink-0" />
              <span>Downloaded {current.item}</span>
              <span className="text-gray-400 text-[10px]">• {current.timeAgo}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss notification"
          className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
