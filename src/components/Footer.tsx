import React, { useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { PolicyModalState } from "../types";

export const Footer: React.FC = () => {
  const [modalState, setModalState] = useState<PolicyModalState>({
    isOpen: false,
    title: "",
    content: "",
  });

  const openModal = (title: string, content: string) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const policies = {
    about: {
      title: "About Our Free Resources",
      content: "We provide high-quality productivity systems to help ambitious people take control of their time and habits. Our 2027 Digital Planner is handcrafted for smooth tablet annotation, and our AI Habit Tracker generator empowers custom routine design.",
    },
    privacy: {
      title: "Privacy Policy",
      content: "We respect your personal privacy. We do not sell or trade personal data. No accounts or credit cards are required to access our free digital resources.",
    },
    terms: {
      title: "Terms of Use",
      content: "All resources, including the 2027 Digital Planner PDF and AI Habit Tracker prompts, are provided free of charge for personal productivity use.",
    },
    contact: {
      title: "Contact & Support",
      content: "Need assistance with downloading or using your digital planner? Contact us at support@digitalplanner2027.org. We respond within 24-48 business hours.",
    },
  };

  return (
    <footer className="mt-4 sm:mt-8 bg-[#14213D] text-gray-300 py-8 px-4 border-t border-slate-800 shrink-0">
      <div className="max-w-[850px] mx-auto flex flex-col items-center text-center space-y-4">
        
        {/* Brand */}
        <div className="flex items-center gap-1.5 text-sm font-bold text-white">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block mr-1"></span>
          <span>Digital Planner 2027</span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-400 font-medium">
          <button
            onClick={() => openModal(policies.about.title, policies.about.content)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <span>•</span>
          <button
            onClick={() => openModal(policies.privacy.title, policies.privacy.content)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            onClick={() => openModal(policies.terms.title, policies.terms.content)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Use
          </button>
          <span>•</span>
          <button
            onClick={() => openModal(policies.contact.title, policies.contact.content)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Security & Copyright */}
        <div className="text-[11px] text-gray-400 pt-2 border-t border-slate-800/80 w-full text-center flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
            <span>Clean, secure digital downloads</span>
          </span>
          <span>© 2027 Digital Planner. All Rights Reserved.</span>
        </div>
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        >
          <div className="bg-white rounded-xl max-w-md w-full p-5 text-gray-800 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
              <h3 className="font-bold text-[#14213D] text-base">{modalState.title}</h3>
              <button
                onClick={closeModal}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{modalState.content}</p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={closeModal}
                className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
