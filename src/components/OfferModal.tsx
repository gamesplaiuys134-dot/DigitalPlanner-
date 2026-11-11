import React, { useState, useEffect } from "react";
import { X, Lock, Sparkles, ShieldCheck, Loader2, RefreshCw, CheckCircle2, AlertCircle, ArrowRight, Smartphone, Laptop } from "lucide-react";
import { Offer, OfferType } from "../types";

interface OfferModalProps {
  isOpen: boolean;
  activeOffer: OfferType;
  onClose: () => void;
  onUnlockSuccess: (type: OfferType) => void;
}

export const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  activeOffer,
  onClose,
  onUnlockSuccess,
}) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clickedOfferId, setClickedOfferId] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const fetchOffers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/offers?max=5");
      const data = await res.json();
      if (data.success && Array.isArray(data.offers) && data.offers.length > 0) {
        setOffers(data.offers);
      } else if (Array.isArray(data.offers) && data.offers.length > 0) {
        setOffers(data.offers);
      } else {
        setOffers([
          {
            offerid: 101,
            name: "AppMatch Quick Opinion Survey",
            name_short: "Quick 1-Minute Survey",
            description: "Answer a 1-minute survey to verify and unlock.",
            adcopy: "Complete a quick 1-minute survey to instantly unlock.",
            picture: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
            payout: "FREE",
            country: "GLOBAL",
            device: "All Devices",
            link: "https://google.com",
            epc: "0.25"
          },
          {
            offerid: 102,
            name: "AliExpress Deals & Shopping",
            name_short: "AliExpress Free App",
            description: "Download, open the free app and browse for 30s.",
            adcopy: "Download, open the free app and explore for 30s.",
            picture: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&auto=format&fit=crop&q=80",
            payout: "FREE",
            country: "GLOBAL",
            device: "Mobile / Tablet",
            link: "https://google.com",
            epc: "0.32"
          }
        ]);
      }
    } catch (err: any) {
      console.error("Error loading offers:", err);
      setError("Unable to load campaigns. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOffers();
      setClickedOfferId(null);
      setIsVerifying(false);
    }
  }, [isOpen]);

  if (!isOpen || !activeOffer) return null;

  const targetTitle =
    activeOffer === "planner"
      ? "Digital Planner 2027 (PDF)"
      : "AI Habit Tracker Prompt";

  const handleOfferClick = (offer: Offer) => {
    setClickedOfferId(offer.offerid);
    setIsVerifying(true);
    if (offer.link) {
      window.open(offer.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleManualVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      onUnlockSuccess(activeOffer);
      onClose();
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#14213D] via-[#1E293B] to-[#14213D] px-4 py-3 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400 text-gray-950 flex items-center justify-center font-bold text-xs shrink-0">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white leading-tight">
                Quick Offer Verification
              </h3>
              <span className="text-[10px] text-gray-300 block">
                Unlocking: {targetTitle}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Callout */}
        <div className="bg-blue-50 px-4 py-2 text-xs text-blue-900 border-b border-blue-200/60 flex items-center gap-1.5 font-medium shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Complete any <strong>1 free offer</strong> below to unlock your download:</span>
        </div>

        {/* Offer List */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2.5 flex-1">
          {isLoading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <p className="text-xs font-medium text-gray-500">Loading free offers...</p>
            </div>
          ) : error ? (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs text-center space-y-2">
              <p>{error}</p>
              <button
                onClick={fetchOffers}
                className="inline-flex items-center gap-1 px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-semibold"
              >
                <RefreshCw className="w-3 h-3" /> Retry
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {offers.map((offer) => {
                const isSelected = clickedOfferId === offer.offerid;
                return (
                  <div
                    key={offer.offerid}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 bg-white ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-400"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {offer.picture ? (
                        <img
                          src={offer.picture}
                          alt={offer.name_short || offer.name}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0 border border-gray-100"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-extrabold text-xs sm:text-sm text-[#14213D] truncate">
                            {offer.name_short || offer.name}
                          </h4>
                          {offer.device && (
                            <span className="text-[9px] font-semibold bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded shrink-0">
                              {offer.device}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-gray-500 truncate leading-snug">
                          {offer.adcopy || offer.description || "Complete instructions to unlock."}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOfferClick(offer)}
                      type="button"
                      className={`px-3 py-2 rounded-lg font-bold text-xs shrink-0 cursor-pointer transition-all inline-flex items-center gap-1 ${
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-[#22B36B] hover:bg-[#1ca05e] text-white"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Started</span>
                        </>
                      ) : (
                        <>
                          <span>Start</span>
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Verification in-progress action */}
          {clickedOfferId && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span className="font-medium text-center sm:text-left">
                Complete the offer in the new tab, then tap to unlock:
              </span>
              <button
                onClick={handleManualVerify}
                disabled={isVerifying}
                type="button"
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Unlocking...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>I Finished — Unlock Now</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 shrink-0">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Free Verification</span>
          </span>
          <button
            onClick={fetchOffers}
            className="text-gray-400 hover:text-gray-600 font-medium flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refresh</span>
          </button>
        </div>

      </div>
    </div>
  );
};
