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
import { DIGITAL_PLANNER_URL, HABIT_TRACKER_PROMPT, HABIT_TRACKER_PROMPT_URL } from '../config';
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
    // Direct open planner
    window.open(DIGITAL_PLANNER_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="download-section" className="mt-12 space-y-8 max-w-[850px] mx-auto px-4">
      
      {/* 1. DIGITAL PLANNER UNLOCKED INTERFACE */}
      {unlockState.planner && (
        <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-xl overflow-hidden transition-all">
          {/* Green Success Message Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 sm:p-6 text-white flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Verification Successful!
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Your 2027 Digital Planner is Unlocked &amp; Ready
                </h3>
              </div>
            </div>

            <a
              href={DIGITAL_PLANNER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-white text-emerald-800 hover:bg-emerald-50 shadow-md transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Spreadsheet</span>
            </a>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#14213D] text-base">
                    Digital Planner 2027 Edition
                  </h4>
                  <p className="text-xs text-gray-500">
                    Google Sheets Spreadsheet &amp; Exportable PDF • Full Year 2027
                  </p>
                </div>
              </div>

              {/* Access Google Sheets button */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                <a
                  href={DIGITAL_PLANNER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-white text-sm sm:text-base shadow-lg bg-[#22B36B] hover:bg-[#1ca05e] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Access Google Sheets Planner</span>
                </a>
              </div>
            </div>

            {/* Quick App Import Instructions */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 text-xs text-gray-600 space-y-3">
              <div className="font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 text-xs">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>How to use your planner in 3 simple steps:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-gray-700 pl-1">
                <li>
                  <strong>Open the Google Sheet</strong> by clicking the green button above.
                </li>
                <li>
                  <strong>Make a private copy:</strong> In Google Sheets, tap <em>File &rarr; Make a copy</em> to save it to your own Google Drive.
                </li>
                <li>
                  <strong>Optional PDF Export:</strong> Tap <em>File &rarr; Download &rarr; PDF</em> if you want to import it directly into GoodNotes, Notability, or Apple Books.
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

            {/* Action Buttons in Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={HABIT_TRACKER_PROMPT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-white text-blue-800 hover:bg-blue-50 shadow-md transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Claude.ai</span>
              </a>

              <button
                onClick={handleCopyPrompt}
                type="button"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                  copiedPrompt
                    ? 'bg-emerald-500 text-white'
                    : 'bg-blue-900/60 text-white border border-white/20 hover:bg-blue-900'
                }`}
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Copy Status Feedback Alert */}
            {copiedPrompt && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                Prompt copied successfully! Paste it into Claude, ChatGPT, or Gemini to generate your custom tracker.
              </div>
            )}

            {/* Complete Prompt Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-blue-600" />
                  Master Habit Architect Prompt
                </span>
                <a
                  href={HABIT_TRACKER_PROMPT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 text-xs"
                >
                  <span>Open directly in Claude.ai</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 font-mono text-xs leading-relaxed max-h-[380px] overflow-y-auto border border-slate-700 shadow-inner">
                <pre className="whitespace-pre-wrap select-all font-mono text-[11px] sm:text-xs">
                  {HABIT_TRACKER_PROMPT}
                </pre>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-2.5">
              <a
                href={HABIT_TRACKER_PROMPT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span>Open in Claude.ai Artifact</span>
              </a>

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
