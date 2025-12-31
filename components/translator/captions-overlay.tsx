"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { useTranslatorStore } from "@/store/use-translator";

export const CaptionsOverlay = () => {
  const captions = useTranslatorStore((state) => state.captionBuffer);
  const enabled = useTranslatorStore((state) => state.enabled);
  const showOriginal = useTranslatorStore((state) => state.showOriginal);
  const autoTranslateEnabled = useTranslatorStore(
    (state) => state.autoTranslateEnabled
  );
  const targetLang = useTranslatorStore((state) => state.targetLang);

  const latestCaption = useMemo(() => {
    const sorted = [...captions].sort((a, b) => a.ts - b.ts);
    return sorted[sorted.length - 1];
  }, [captions]);

  const [activeCaption, setActiveCaption] = useState<typeof latestCaption>();

  useEffect(() => {
    if (!latestCaption) return;
    setActiveCaption(latestCaption);

    const timer = setTimeout(() => {
      setActiveCaption(undefined);
    }, 4000);

    return () => clearTimeout(timer);
  }, [latestCaption]);

  if (!enabled && !activeCaption) return null;

  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-40 flex w-full max-w-[min(920px,95vw)] -translate-x-1/2 flex-col gap-2">
      {activeCaption && (
        <div
          key={activeCaption.utteranceId}
          className={cn(
            "flex w-full flex-col gap-1 rounded-lg bg-black/70 px-4 py-2 text-white shadow-lg backdrop-blur-md transition-opacity duration-300"
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {activeCaption.speakerName && (
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-sky-400">
                {activeCaption.speakerName}:
              </span>
            )}
            <div className="min-w-0 flex-1 truncate whitespace-nowrap text-sm font-medium">
              {activeCaption.text}
            </div>
          </div>
          {autoTranslateEnabled &&
            Boolean(targetLang) &&
            activeCaption.translatedText && (
              <div className="flex items-baseline gap-2 border-t border-white/5 pt-1 text-sm font-semibold text-lime-400">
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider">
                  Translation:
                </span>
                <div className="min-w-0 flex-1 truncate whitespace-nowrap">
                  {activeCaption.translatedText}
                </div>
              </div>
            )}
          {!(
            autoTranslateEnabled &&
            Boolean(targetLang) &&
            activeCaption.translatedText
          ) &&
            showOriginal &&
            activeCaption.translatedText && (
              <div className="border-t border-white/5 pt-1 text-sm text-white/50 truncate whitespace-nowrap italic">
                {activeCaption.translatedText}
              </div>
            )}
        </div>
      )}
    </div>
  );
};
