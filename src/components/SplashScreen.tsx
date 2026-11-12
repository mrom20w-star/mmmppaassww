import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../services/sound';
import { Language } from '../types';
import { CRASH_BIT_LOGO } from '../services/translations';

interface SplashScreenProps {
  onComplete: () => void;
  language: Language;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, language }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2800; // 2.8 seconds boot sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        sound.playSuccess();
        setTimeout(() => setIsFadingOut(true), 350);
        setTimeout(() => onComplete(), 950);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const isArabic = language === 'ar';
  const stepsAr = [
    'تأمين مصفوفة الرادار المشفّرة...',
    'معايرة منصات 1xBet · MELBET · spinbetter...',
    'تفعيل كود البروموكود MXG1...',
    'سكريبت Crash Bit جاهز للتشغيل',
  ];
  const stepsEn = [
    'SECURING ENCRYPTED RADAR MATRIX...',
    'CALIBRATING 1xBet · MELBET · spinbetter...',
    'APPLYING MXG1 PROMO MATRIX...',
    'CRASH BIT TERMINAL READY',
  ];

  const steps = isArabic ? stepsAr : stepsEn;
  const currentStepIndex = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black transition-all duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[55%] h-[55%] rounded-full blur-[130px] bg-[rgba(59,130,246,0.22)] animate-pulse" />
        <div
          className="absolute bottom-[-15%] right-[-15%] w-[55%] h-[55%] rounded-full blur-[130px] bg-[rgba(14,165,233,0.18)] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.35) 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(circle at 50% 45%, black, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black, transparent 72%)',
          }}
        />
      </div>

      {/* Vertical scanline */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="h-28 w-full bg-gradient-to-b from-transparent via-[rgba(59,130,246,0.15)] to-transparent animate-scan" />
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
        {/* Animated Futuristic Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
          className="relative mb-8 flex items-center justify-center"
        >
          {/* Radial Glow */}
          <div className="absolute -inset-10 rounded-full blur-[70px] bg-[rgba(59,130,246,0.35)] animate-pulse" />

          {/* Rotating Cyber Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-6 rounded-full border border-dashed border-[rgba(59,130,246,0.5)]"
          />

          {/* Rotating Inner Reverse Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-3 rounded-full border border-dotted border-[rgba(14,165,233,0.4)]"
          />

          {/* Crash Bit Generated Logo */}
          <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-3xl bg-black border-2 border-[rgba(59,130,246,0.5)] shadow-[0_0_40px_rgba(59,130,246,0.5)] backdrop-blur-xl p-2 overflow-hidden">
            <img
              src={CRASH_BIT_LOGO}
              alt="Crash Bit"
              className="w-full h-full object-cover rounded-2xl drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
            />
          </div>
        </motion.div>

        {/* Brand Name: Crash Bit */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-black tracking-wider text-white flex items-center justify-center gap-2.5 font-mono">
            <span className="text-white">CRASH</span>
            <span className="text-[#3B82F6] drop-shadow-[0_0_22px_rgba(59,130,246,0.9)]">
              BIT
            </span>
          </h1>
          <p className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
            {isArabic ? 'تشفير حماية عالي الأمان | Crash Bit' : 'HIGH SECURITY TERMINAL | Crash Bit'}
          </p>

          <div className="mt-2.5 flex items-center justify-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 font-mono text-[9px] text-[#38bdf8]">
              1xBet
            </span>
            <span className="text-white/20">·</span>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 font-mono text-[9px] text-[#fbbf24]">
              MELBET
            </span>
            <span className="text-white/20">·</span>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 font-mono text-[9px] text-[#34d399]">
              spinbetter
            </span>
          </div>
        </motion.div>

        {/* Progress Bar & Readout */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono font-black text-white/70 px-1">
            <span className="text-[11px] text-[#3B82F6] font-bold tracking-wider truncate max-w-[240px]">
              {steps[currentStepIndex]}
            </span>
            <span className="tabular-nums text-white text-sm">
              {progress}%
            </span>
          </div>

          {/* Track */}
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.08] border border-white/10 p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#60a5fa] shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-ping" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
              PROMO: MXG1 · NODE-SECURE v3.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
