import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  Copy,
  Check,
  ExternalLink,
  Bot,
  FileText,
  Sparkles,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { DIGITAL_PLANNER_URL, HABIT_TRACKER_PROMPT } from '../config';
import { UnlockState } from '../types';

interface UnlockSuccessProps {
  unlockState: UnlockState;
}

export const UnlockSuccess: React.FC<UnlockSuccessProps> = ({ unlockState }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // If neither offer is unlocked yet, do NOT render or expose the protected content
  if (!unlockState.planner && !unlockState.prompt) {
    return null;
  }

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(HABIT_TRACKER_PROMPT);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 3000);
    } catch (err) {
      // Fallback copy mechanism
      const textArea = document.createElement('textarea');
      textArea.value = HABIT_TRACKER_PROMPT;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 3000);
    }
  };

  const handleDownloadPDF = () => {
    // Open configured PDF URL
    if (DIGITAL_PLANNER_URL === "YOUR_DIGITAL_PLANNER_PDF_URL") {
      // Placeholder alert or direct download trigger
      const dummyBlob = new Blob([
        `%PDF-1.4\n% 2027 Digital Planner Placeholder\n% Configured via DIGITAL_PLANNER_URL in config.ts\n1 0 obj\n<< /Title (2027 Digital Planner) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`
      ], { type: 'application/pdf' });
      const url = URL.createObjectURL(dummyBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Digital_Planner_2027_Edition.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      window.open(DIGITAL_PLANNER_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="download-section" className="mt-12 space-y-8 max-w-[850px] mx-auto px-4">
      
      {/* 1. DIGITAL PLANNER UNLOCKED INTERFACE */}
      {unlockState.planner && (
        <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-xl overflow-hidden transition-all">
          {/* Green Success Message Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 sm:p-6 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Verification Successful!
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Your 2027 Digital Planner PDF is Ready for Download
              </h3>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#14213D] text-base">
                    Digital_Planner_2027_Edition.pdf
                  </h4>
                  <p className="text-xs text-gray-500">
                    Interactive Hyperlinked PDF • 14.2 MB • Full Year 2027
                  </p>
                </div>
              </div>

              {/* Download PDF button */}
              <button
                onClick={handleDownloadPDF}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-white text-base shadow-lg bg-[#22B36B] hover:bg-[#1ca05e] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
            </div>

            {/* Quick App Import Instructions */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 text-xs text-gray-600 space-y-3">
              <div className="font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 text-xs">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>How to use your planner in 3 simple steps:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-gray-700 pl-1">
                <li>
                  <strong>Download the PDF</strong> to your iPad, tablet, or desktop using the button above.
                </li>
                <li>
                  <strong>Open in your favorite note app:</strong> GoodNotes, Notability, Apple Books, Samsung Notes, or Adobe Acrobat.
                </li>
                <li>
                  <strong>Click the side tabs</strong> to navigate instantly between monthly calendars, daily pages, and habit grids.
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* 2. HABIT TRACKER PROMPT UNLOCKED INTERFACE */}
      {unlockState.prompt && (
        <div id="prompt-section" className="bg-white rounded-2xl border-2 border-blue-500 shadow-xl overflow-hidden transition-all">
          {/* Blue/Green Success Message Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-5 sm:p-6 text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Verification Successful!
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Your Personalized Habit Tracker AI Prompt is Ready
                </h3>
              </div>
            </div>

            {/* Copy Prompt Button in Header */}
            <button
              onClick={handleCopyPrompt}
              type="button"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                copiedPrompt
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-blue-800 hover:bg-blue-50'
              }`}
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Copy Status Feedback Alert */}
            {copiedPrompt && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                Prompt copied successfully! Paste it into ChatGPT or Gemini to generate your custom tracker.
              </div>
            )}

            {/* Complete Prompt Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-blue-600" />
                  Master Habit Architect Prompt
                </span>
                <span className="text-gray-400">Ready to paste</span>
              </div>

              <div className="relative bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 font-mono text-xs leading-relaxed max-h-[380px] overflow-y-auto border border-slate-700 shadow-inner">
                <pre className="whitespace-pre-wrap select-all font-mono text-[11px] sm:text-xs">
                  {HABIT_TRACKER_PROMPT}
                </pre>
              </div>
            </div>

            {/* Bottom Copy Prompt Button */}
            <div className="flex justify-end">
              <button
                onClick={handleCopyPrompt}
                type="button"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  copiedPrompt
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2563EB] hover:bg-blue-700 text-white'
                }`}
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Copied! Ready to Paste</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Full Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* How to use with ChatGPT or Gemini per Section 6 */}
            <div className="bg-blue-50/80 rounded-xl p-5 border border-blue-200/80 text-xs sm:text-sm text-gray-700 space-y-3">
              <div className="font-bold text-blue-950 uppercase tracking-wider flex items-center gap-2 text-xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>How to use this prompt with ChatGPT or Gemini:</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
                  <div className="font-bold text-blue-700 text-xs mb-1">Step 1: Copy &amp; Open</div>
                  <p className="text-gray-600 text-xs leading-normal">
                    Click <strong>Copy Prompt</strong> above, then open{' '}
                    <a href="https://chatgpt.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium">
                      ChatGPT
                    </a>{' '}
                    or{' '}
                    <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium">
                      Gemini
                    </a>.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
                  <div className="font-bold text-blue-700 text-xs mb-1">Step 2: Paste the Prompt</div>
                  <p className="text-gray-600 text-xs leading-normal">
                    Paste the entire text into the chat. The AI will ask you 6 diagnostic questions about your routine, chronotype, and goals.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
                  <div className="font-bold text-blue-700 text-xs mb-1">Step 3: Receive Your Plan</div>
                  <p className="text-gray-600 text-xs leading-normal">
                    Answer the questions and receive a custom daily routine, habit stacking formula, and printable/digital tracking grid.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
