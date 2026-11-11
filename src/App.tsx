import { useState, useCallback } from "react";
import { HeaderBar } from "./components/HeaderBar";
import { HeroSection } from "./components/HeroSection";
import { ScarcityCounter } from "./components/ScarcityCounter";
import { DigitalPlannerCard } from "./components/DigitalPlannerCard";
import { HabitTrackerPromptCard } from "./components/HabitTrackerPromptCard";
import { OfferModal } from "./components/OfferModal";
import { UnlockSuccess } from "./components/UnlockSuccess";
import { HowItWorks } from "./components/HowItWorks";
import { TrustSection } from "./components/TrustSection";
import { SocialProofToast } from "./components/SocialProofToast";
import { Footer } from "./components/Footer";
import { OfferType, UnlockState } from "./types";
import { useScarcity } from "./hooks/useScarcity";

export default function App() {
  const [activeOfferModal, setActiveOfferModal] = useState<OfferType>(null);
  const scarcityData = useScarcity(24);

  const [unlockState, setUnlockState] = useState<UnlockState>({
    planner: false,
    prompt: false,
  });

  const handleOpenPlannerOffers = useCallback(() => {
    setActiveOfferModal("planner");
  }, []);

  const handleOpenPromptOffers = useCallback(() => {
    setActiveOfferModal("prompt");
  }, []);

  const handleCloseOffers = useCallback(() => {
    setActiveOfferModal(null);
  }, []);

  const handleUnlockSuccess = useCallback((type: OfferType) => {
    if (!type) return;
    setUnlockState((prev) => ({ ...prev, [type]: true }));
    setActiveOfferModal(null);

    // Scroll smoothly to unlocked download/prompt
    setTimeout(() => {
      const targetId = type === "planner" ? "download-section" : "prompt-section";
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  }, []);

  const scrollToOffers = () => {
    const el = document.getElementById("digital-planner-offer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToPromptOffer = () => {
    const el = document.getElementById("habit-tracker-offer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans text-gray-800 antialiased relative">
      {/* SECTION 1 — TOP PROMOTIONAL BAR */}
      <HeaderBar
        onScrollToOffers={scrollToOffers}
        remainingCopies={scarcityData.remainingCopies}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[850px] mx-auto px-2 sm:px-4 py-2 sm:py-5 space-y-2.5 sm:space-y-5">
        
        {/* SECTION 2 — MAIN HERO */}
        <HeroSection
          onSelectPlanner={scrollToOffers}
          onSelectPrompt={scrollToPromptOffer}
        />

        {/* SCARCITY COUNTER (Limited copies remaining & auto-decreases) */}
        <ScarcityCounter scarcityData={scarcityData} />

        {/* SECTION 3 — DIGITAL PLANNER PRODUCT CARD */}
        <DigitalPlannerCard
          onUnlockClick={handleOpenPlannerOffers}
          isUnlocked={unlockState.planner}
          remainingCopies={scarcityData.remainingCopies}
        />

        {/* SECTION 4 — PERSONALIZED HABIT TRACKER PROMPT CARD */}
        <HabitTrackerPromptCard
          onUnlockClick={handleOpenPromptOffers}
          isUnlocked={unlockState.prompt}
        />

        {/* SECTION 6 — DOWNLOAD & UNLOCKED RESOURCE DISPLAY */}
        <UnlockSuccess unlockState={unlockState} />

        {/* SECTION 7 — HOW IT WORKS */}
        <HowItWorks />

        {/* SECTION 8 — TRUST SECTION */}
        <TrustSection />

      </main>

      {/* LIVE RECENT DOWNLOAD NOTIFICATIONS (Social Proof Toast) */}
      <SocialProofToast />

      {/* LIVE OFFER API MODAL */}
      <OfferModal
        isOpen={Boolean(activeOfferModal)}
        activeOffer={activeOfferModal}
        onClose={handleCloseOffers}
        onUnlockSuccess={handleUnlockSuccess}
      />

      {/* SECTION 9 — FOOTER */}
      <Footer />
    </div>
  );
}
