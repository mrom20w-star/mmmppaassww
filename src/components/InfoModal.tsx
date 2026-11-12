import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { sound } from '../services/sound';
import { Language } from '../types';
import { translations, PROMO_CODE } from '../services/translations';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, language }) => {
  const t = translations[language];
  const isArabic = language === 'ar';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-md overflow-hidden rounded-[26px] border border-[rgba(59,130,246,0.3)] bg-[#030712] shadow-[0_0_50px_rgba(59,130,246,0.25)]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[rgba(59,130,246,0.06)] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="h-5 w-5 text-[#3B82F6]" />
                <span className="text-sm font-black text-white font-mono">
                  Crash Bit · {t.info_modal_title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all hover:text-white hover:border-white/30 active:scale-90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    {t.official_disclaimer}
                  </h4>
                  <p className="text-[11px] text-white/50 mt-0.5 font-mono">
                    Crash Bit Radar v3.0 · PROMO: {PROMO_CODE}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 text-xs text-white/70 leading-relaxed font-medium">
                <p className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-1.5" />
                  <span>{t.info_desc_1}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-1.5" />
                  <span>{t.info_desc_2}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-1.5" />
                  <span>{t.info_desc_3}</span>
                </p>
                <p className="flex items-start gap-2 text-white/50 text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{isArabic ? 'المنصات المدعومة: 1xBet ، MELBET ، spinbetter.' : 'Supported platforms: 1xBet, MELBET, spinbetter.'}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-l from-[#3B82F6] to-white text-sm font-black text-black shadow-[0_8px_25px_-8px_rgba(59,130,246,0.8)] transition-all active:scale-[0.98]"
              >
                {t.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
