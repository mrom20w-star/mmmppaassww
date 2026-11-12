import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  RotateCcw,
  Users,
  Activity,
  History,
  ShieldCheck,
  Plane,
  Send,
} from 'lucide-react';
import { sound } from '../services/sound';
import { Language, PlatformType } from '../types';
import {
  translations,
  PLATFORMS_CONFIG,
  PROMO_CODE,
  CRASH_BIT_LOGO,
  TELEGRAM_URL,
} from '../services/translations';

interface CrashPredictorProps {
  onBack: () => void;
  userId: string;
  selectedPlatform: PlatformType;
  language: Language;
}

export const CrashPredictor: React.FC<CrashPredictorProps> = ({
  onBack,
  userId,
  selectedPlatform,
  language,
}) => {
  const [currentOdd, setCurrentOdd] = useState('0.00x');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(1542);
  const [prevSignals, setPrevSignals] = useState<string[]>([
    '2.45x',
    '1.88x',
    '3.70x',
    '1.32x',
    '2.15x',
    '5.20x',
    '1.64x',
  ]);

  const t = translations[language];
  const isArabic = language === 'ar';
  const hasPrediction = currentOdd !== '0.00x';
  const platform = PLATFORMS_CONFIG[selectedPlatform];

  // Fluctuate active online users realistically
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) =>
        Math.min(2800, Math.max(900, prev + Math.floor(Math.random() * 7) - 3))
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    if (isAnalyzing) return;
    sound.playClick();
    setIsAnalyzing(true);

    // Generate random realistic crash multiplier between 1.35 and 5.20, with occasional higher odds
    const rand = Math.random();
    let targetNum: number;
    if (rand < 0.45) {
      targetNum = 1.35 + Math.random() * 0.95; // 1.35 - 2.30
    } else if (rand < 0.8) {
      targetNum = 2.3 + Math.random() * 1.8; // 2.30 - 4.10
    } else {
      targetNum = 4.1 + Math.random() * 3.8; // 4.10 - 7.90
    }

    const finalOdd = `${targetNum.toFixed(2)}x`;

    // Cyber countup animation
    const steps = 14;
    for (let i = 0; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, 65));
      sound.playScan();
      if (i < steps) {
        const intermediate = (1.0 + (targetNum - 1.0) * (i / steps)).toFixed(2);
        setCurrentOdd(`${intermediate}x`);
      } else {
        setCurrentOdd(finalOdd);
      }
    }

    sound.playSuccess();
    setIsAnalyzing(false);
    setPrevSignals((prev) => [finalOdd, ...prev.slice(0, 8)]);
  };

  const handleReset = () => {
    sound.playClick();
    setIsAnalyzing(false);
    setCurrentOdd('0.00x');
  };

  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden text-white font-sans selection:bg-[#3B82F6]/30 pb-16 select-none"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background glow orb */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[rgba(59,130,246,0.12)] blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(59,130,246,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.4)_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col px-5 pt-6">
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            aria-label="Back"
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all hover:border-[rgba(59,130,246,0.4)] hover:text-[#3B82F6] active:scale-95 text-xs font-bold text-white/70"
          >
            {isArabic ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            <span>{t.back_to_settings}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Telegram Channel Button */}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.1)] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-black transition-all active:scale-95 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
              title="Telegram: @onexmega_official"
            >
              <Send className="h-3.5 w-3.5" />
            </a>

            {/* Online Users Pill */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 backdrop-blur-md">
              <Users className="h-3 w-3 text-[#3B82F6]" />
              <span className="font-mono text-[11px] font-black tabular-nums text-white/70">
                {onlineUsers.toLocaleString()}
              </span>
              <span className="text-[9px] text-white/40">{t.online_users}</span>
            </div>

            {/* Latency Pill */}
            <div className="flex items-center gap-1.5 rounded-full border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.07)] px-3 py-1.5 backdrop-blur-md">
              <Activity className="h-3 w-3 animate-pulse text-[#3B82F6]" />
              <span className="text-[10px] font-mono font-black tracking-widest text-[#3B82F6]">
                {platform.latency}
              </span>
            </div>
          </div>
        </div>

        {/* Game Title & Crash Bit Brand Card */}
        <div className="mt-5 flex items-center justify-between p-3.5 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[rgba(59,130,246,0.12)] via-black/80 to-black backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative h-13 w-13 shrink-0 rounded-xl bg-black border border-[rgba(59,130,246,0.4)] p-1 overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <img
                src={CRASH_BIT_LOGO}
                alt="Crash Bit"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-white font-mono">
                  Crash <span className="text-[#3B82F6]">Bit</span>
                </h1>
                <span
                  className="px-2 py-0.5 rounded-md font-mono text-[10px] font-black border"
                  style={{
                    backgroundColor: `${platform.color}15`,
                    borderColor: `${platform.color}50`,
                    color: platform.color,
                  }}
                >
                  {platform.name}
                </span>
              </div>
              <p className="font-mono text-[10px] text-white/40 mt-0.5">
                ID: {userId || '1829018123'} · PROMO: {PROMO_CODE}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-lg bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] text-[#3B82F6]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>99.2%</span>
          </div>
        </div>

        {/* Central Radar Circular Interface */}
        <div
          className="relative mx-auto mt-6 flex items-center justify-center"
          style={{ width: 310, height: 310 }}
        >
          {/* Concentric pulsing radar rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[rgba(59,130,246,0.45)]"
              style={{ width: 310, height: 310 }}
              animate={{ scale: [0.72, 1], opacity: [0.55, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: i * 0.85,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Rotating radar scanbeam */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 310,
              height: 310,
              background: `conic-gradient(from 0deg, rgba(59,130,246,0) 0deg, rgba(59,130,246,0.55) 90deg, rgba(59,130,246,0) 200deg)`,
              mask: 'radial-gradient(circle, transparent 61%, #000 62%)',
              WebkitMask: 'radial-gradient(circle, transparent 61%, #000 62%)',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: isAnalyzing ? 1.1 : 5.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Central Target Display */}
          <motion.div
            animate={{
              boxShadow: isAnalyzing
                ? [
                    '0 0 30px rgba(59,130,246,0.3), inset 0 0 40px rgba(59,130,246,0.15)',
                    '0 0 70px rgba(59,130,246,0.6), inset 0 0 60px rgba(59,130,246,0.25)',
                    '0 0 30px rgba(59,130,246,0.3), inset 0 0 40px rgba(59,130,246,0.15)',
                  ]
                : '0 0 35px rgba(59,130,246,0.2), inset 0 0 35px rgba(59,130,246,0.1)',
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex flex-col items-center justify-center rounded-full border border-[rgba(59,130,246,0.4)] bg-gradient-to-b from-[rgba(59,130,246,0.14)] via-black/90 to-black backdrop-blur-2xl"
            style={{ width: 255, height: 255 }}
          >
            {/* Top Label */}
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#3B82F6]">
              {isAnalyzing ? t.analyzing_label : t.odd_label}
            </span>

            {/* Giant Multiplier Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentOdd}
                initial={{ scale: 0.92, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.12 }}
                className="mt-1 font-mono text-[52px] sm:text-[56px] font-black leading-none tracking-tight"
                style={{
                  color: hasPrediction ? '#3B82F6' : '#ffffff',
                  textShadow: hasPrediction
                    ? '0 0 30px rgba(59,130,246,0.8), 0 0 60px rgba(59,130,246,0.4)'
                    : '0 0 15px rgba(255,255,255,0.2)',
                }}
              >
                {currentOdd}
              </motion.div>
            </AnimatePresence>

            {/* Subtext description */}
            <p className="mt-2.5 max-w-[190px] text-center text-[10px] font-medium leading-relaxed text-white/50">
              {isAnalyzing
                ? t.connecting_server
                : hasPrediction
                ? t.confirmed_pred
                : t.press_to_predict}
            </p>

            {/* Confidence tag */}
            {hasPrediction && (
              <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.4)]">
                <Plane className="h-3 w-3 text-[#3B82F6]" />
                <span className="text-[9px] font-mono font-bold text-[#3B82F6]">
                  {platform.name} MATRIX LOCKED
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Previous Signals History */}
        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <History className="h-3.5 w-3.5 text-[#3B82F6]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                {t.prev_signals}
              </span>
            </div>
            <span className="text-[9px] font-mono text-white/30">
              {prevSignals.length} SIGNALS LOGGED
            </span>
          </div>

          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-1">
            {prevSignals.map((odd, idx) => (
              <div
                key={`${odd}-${idx}`}
                className={`shrink-0 rounded-xl border px-3 py-1.5 font-mono text-[11px] font-black transition-all ${
                  idx === 0
                    ? 'border-[rgba(59,130,246,0.7)] bg-[rgba(59,130,246,0.15)] text-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'border-white/[0.08] bg-white/[0.02] text-white/40'
                }`}
              >
                {odd}
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {/* Start / Predict */}
          <button
            type="button"
            onClick={handleStart}
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#3B82F6] to-white py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-black shadow-[0_16px_40px_-16px_rgba(59,130,246,0.85)] transition-all active:scale-[0.97] disabled:opacity-50 hover:brightness-105"
          >
            <Play className="h-4 w-4 fill-black" />
            <span>{t.start}</span>
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[rgba(59,130,246,0.35)] bg-white/[0.03] py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-[#3B82F6] transition-all active:scale-[0.97] disabled:opacity-50 hover:bg-[rgba(59,130,246,0.08)]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t.reset}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
