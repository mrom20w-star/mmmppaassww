import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  Zap,
  Info,
  Globe,
  Volume2,
  VolumeX,
  Send,
  User,
  ShieldCheck,
  X,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Plane,
} from 'lucide-react';
import { PlatformType, Language } from '../types';
import { sound } from '../services/sound';
import {
  translations,
  PLATFORMS_CONFIG,
  PROMO_CODE,
  TELEGRAM_URL,
  CRASH_BIT_LOGO,
} from '../services/translations';

interface SettingsScreenProps {
  onComplete: (userId: string) => void;
  selectedPlatform: PlatformType;
  onSelectPlatform: (platform: PlatformType) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenInfo: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onComplete,
  selectedPlatform,
  onSelectPlatform,
  language,
  onLanguageChange,
  onOpenInfo,
}) => {
  const [userId, setUserId] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ userId?: boolean }>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState<'step1' | 'step2' | 'ready'>('step1');
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const t = translations[language];
  const isArabic = language === 'ar';
  const currentPlatform = PLATFORMS_CONFIG[selectedPlatform];

  const handleCopyPromo = () => {
    sound.playCopy();
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 15) {
      setUserId(val);
      if (val.length >= 10) {
        setErrors({});
      }
    }
  };

  const handleSubmit = () => {
    sound.playClick();
    const trimmed = userId.trim();
    if (!trimmed || trimmed.length < 10) {
      sound.playError();
      setErrors({ userId: true });
      return;
    }

    setErrors({});
    setIsVerifying(true);
    setVerifyStep('step1');

    setTimeout(() => {
      setVerifyStep('step2');
      sound.playSoftClick();
    }, 1300);

    setTimeout(() => {
      setVerifyStep('ready');
      sound.playSuccess();
    }, 2600);
  };

  const handleEnterPredictions = () => {
    sound.playClick();
    setIsVerifying(false);
    onComplete(userId.trim());
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-transparent text-white pb-20 select-none"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background cyber grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.09] bg-[linear-gradient(rgba(59,130,246,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.45)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full blur-[130px] bg-[rgba(59,130,246,0.16)]" />
        <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full blur-[130px] bg-[rgba(14,165,233,0.12)]" />
      </div>

      <div className="relative z-10 flex flex-col px-4 sm:px-6 pt-5 max-w-xl mx-auto w-full">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.35)] rounded-full backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_8px_#3B82F6]" />
            <span className="text-[11px] font-black tracking-widest uppercase text-[#3B82F6]">
              {isArabic ? `شروط تفعيل ${currentPlatform.name}` : `${currentPlatform.name} ACTIVATION`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Telegram Channel Link */}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex h-9 px-2.5 items-center justify-center gap-1.5 rounded-xl border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.1)] text-xs font-mono font-bold text-[#3B82F6] hover:bg-[#3B82F6] hover:text-black transition-all active:scale-95 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
              title="Telegram: @onexmega_official"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">@onexmega_official</span>
            </a>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={handleToggleMute}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:border-[#3B82F6]/50 transition-all active:scale-95"
              title="Sound"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#3B82F6]" />}
            </button>

            {/* Language Switch */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onLanguageChange(language === 'ar' ? 'en' : 'ar');
              }}
              className="flex h-9 px-2.5 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-mono font-bold text-white/80 hover:text-white hover:border-[#3B82F6]/50 transition-all active:scale-95"
            >
              <Globe className="h-3.5 w-3.5 text-[#3B82F6]" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Info Disclaimer */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenInfo();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:border-[#3B82F6]/50 transition-all active:scale-95"
              title="Disclaimer"
            >
              <Info className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Hero Card: Crash Bit */}
        <div className="relative mb-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-[rgba(59,130,246,0.14)] via-black/85 to-black p-6 backdrop-blur-xl shadow-[0_0_35px_rgba(59,130,246,0.2)]">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[rgba(59,130,246,0.25)] blur-[90px]" />

          <div className="relative flex flex-col items-center text-center">
            {/* Crash Bit Emblem */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-black border-2 border-[rgba(59,130,246,0.45)] p-1 shadow-[0_0_30px_rgba(59,130,246,0.4)] overflow-hidden">
              <img
                src={CRASH_BIT_LOGO}
                alt="Crash Bit"
                className="h-full w-full object-cover rounded-xl drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]"
              />
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl font-black leading-tight tracking-[0.08em] text-white flex items-center justify-center gap-2 font-mono">
              <span className="text-white">Crash</span>
              <span className="text-[#3B82F6] drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">Bit</span>
            </h1>

            <p className="mt-2 max-w-[340px] text-[11px] sm:text-xs leading-relaxed text-white/60">
              {isArabic
                ? `سكريبت الطائرة الحصري المتوافق مع المنصات الثلاث. نفّذ الشروط الخمسة بالترتيب لتفعيل رادار التوقعات.`
                : `Dedicated airplane trajectory terminal compatible with 1xBet, MELBET, and spinbetter.`}
            </p>

            {/* Stepper beads */}
            <div className="mt-4 flex w-full items-center justify-center gap-1.5" dir="ltr">
              {['01', '02', '03', '04', '05'].map((num, i) => (
                <div key={num} className="flex items-center gap-1.5">
                  <span className="rounded-lg border border-[rgba(59,130,246,0.35)] bg-black/80 px-2.5 py-1 font-mono text-[10px] font-black text-[#3B82F6]">
                    {num}
                  </span>
                  {i !== 4 && <span className="h-[1px] w-2.5 bg-[rgba(59,130,246,0.35)]" />}
                </div>
              ))}
            </div>

            <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.25)]">
              <Zap className="h-3.5 w-3.5 animate-pulse text-[#3B82F6]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B82F6]">
                {isArabic ? 'تفعيل فوري · 5 خطوات' : 'INSTANT ACTIVATION · 5 STEPS'}
              </span>
            </div>
          </div>
        </div>

        {/* 3 PLATFORMS SELECTOR: 1xBet / MELBET / spinbetter */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm sm:text-base font-black flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#3B82F6]" />
              <span>{t.select_platform}</span>
            </h2>
            <span className="text-[10px] font-mono text-[#3B82F6] uppercase font-bold">
              3 PLATFORMS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {(['1xbet', 'melbet', 'spinbetter'] as PlatformType[]).map((platKey) => {
              const plat = PLATFORMS_CONFIG[platKey];
              const isSelected = selectedPlatform === platKey;

              return (
                <button
                  key={platKey}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onSelectPlatform(platKey);
                  }}
                  className={`relative flex flex-col items-center justify-center rounded-2xl border p-3.5 transition-all duration-300 active:scale-[0.97] ${
                    isSelected
                      ? 'border-[#3B82F6] bg-[rgba(59,130,246,0.16)] shadow-[0_0_25px_rgba(59,130,246,0.35)] ring-1 ring-[#3B82F6]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 flex items-center justify-center h-4 w-4 rounded-full bg-[#3B82F6] text-black">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                  )}

                  {/* Platform Badge Monogram */}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl font-mono font-black text-sm mb-2 border shadow-sm transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: isSelected ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.03)',
                      borderColor: isSelected ? plat.color : 'rgba(255,255,255,0.1)',
                      color: plat.color,
                      boxShadow: isSelected ? `0 0 16px ${plat.accentGlow}` : 'none',
                    }}
                  >
                    {plat.badge}
                  </div>

                  <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                    {plat.name}
                  </span>

                  <span className="mt-1 text-[9px] font-mono text-white/50">
                    {plat.latency}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Platform Banner & Promo Code Notice */}
          <div className="mt-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: currentPlatform.color }}
              />
              <span className="text-white/70">
                {isArabic ? `المنصة المحددة: ${currentPlatform.name}` : `Selected: ${currentPlatform.name}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-white/50">{t.promo_badge}</span>
              <span className="font-mono font-black text-[#3B82F6] text-xs tracking-wider bg-[rgba(59,130,246,0.15)] px-2.5 py-0.5 rounded-lg border border-[rgba(59,130,246,0.35)]">
                {PROMO_CODE}
              </span>
            </div>
          </div>
        </section>

        {/* Five Activation Steps */}
        <div className="flex flex-col gap-4">
          {/* STEP 01: Register on Selected Platform */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#030712]/90 p-4 sm:p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.4)] font-mono text-xs font-black text-[#3B82F6]">
                01
              </span>
              <div>
                <span className="block text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
                  {t.step_1_title}
                </span>
                <h3 className="text-sm font-black text-white">
                  {t.step_1_name(currentPlatform.name)}
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div
                  className="w-10 h-10 rounded-xl bg-black border border-white/10 p-1 flex items-center justify-center shrink-0 font-mono font-black text-sm"
                  style={{ color: currentPlatform.color }}
                >
                  {currentPlatform.badge}
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {t.step_1_desc(currentPlatform.name)}
                </p>
              </div>

              <a
                href={currentPlatform.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-full h-13 rounded-xl bg-gradient-to-l from-[#3B82F6] to-white text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:brightness-105"
              >
                <span>{isArabic ? `فتح موقع ${currentPlatform.name} والتسجيل` : `Open ${currentPlatform.name} & Register`}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* STEP 02: Telegram Channel */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#030712]/90 p-4 sm:p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.4)] font-mono text-xs font-black text-[#3B82F6]">
                02
              </span>
              <div>
                <span className="block text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
                  {t.step_2_title}
                </span>
                <h3 className="text-sm font-black text-white">{t.step_2_name}</h3>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 p-1 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/neon-telegram-BXkgNeBN.png"
                    alt="Telegram"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {t.step_2_desc}
                </p>
              </div>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-full h-13 rounded-xl bg-black border border-[rgba(59,130,246,0.5)] text-[#3B82F6] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:bg-[rgba(59,130,246,0.08)]"
              >
                <Send className="w-4 h-4" />
                <span>{isArabic ? 'الانضمام لقناة التلجرام (@onexmega_official)' : 'Join Telegram (@onexmega_official)'}</span>
              </a>
            </div>
          </div>

          {/* STEP 03: Universal Promo Code MXG1 */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#030712]/90 p-4 sm:p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.4)] font-mono text-xs font-black text-[#3B82F6]">
                03
              </span>
              <div>
                <span className="block text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
                  {t.step_3_title}
                </span>
                <h3 className="text-sm font-black text-white">{t.step_3_name}</h3>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 p-1 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/neon-promo-CCjUpgdI.png"
                    alt="Promo"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {t.step_3_desc}
                </p>
              </div>

              {/* Promo code copy card for MXG1 */}
              <div
                onClick={handleCopyPromo}
                className="relative bg-black/75 rounded-2xl border-2 border-dashed border-[rgba(59,130,246,0.5)] hover:border-[#3B82F6] p-4 sm:p-5 transition-all cursor-pointer group flex items-center justify-between shadow-[0_0_25px_rgba(59,130,246,0.15)]"
              >
                <div>
                  <span className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em] mb-1 block">
                    {isArabic ? 'الرمز الترويجي المعتمد (1xBet / MELBET / spinbetter)' : 'VERIFIED PROMO CODE'}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-[0.2em] text-[#3B82F6] drop-shadow-[0_0_18px_rgba(59,130,246,0.7)]">
                      {PROMO_CODE}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30">
                      ACTIVE
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.35)] text-xs font-bold text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-black transition-all">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{isArabic ? 'تم النسخ!' : 'COPIED!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{isArabic ? 'نسخ الكود' : 'COPY'}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 04: Deposit */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#030712]/90 p-4 sm:p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.4)] font-mono text-xs font-black text-[#3B82F6]">
                04
              </span>
              <div>
                <span className="block text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
                  {t.step_4_title}
                </span>
                <h3 className="text-sm font-black text-white">{t.step_4_name}</h3>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 p-1 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/neon-deposit-DBHFZQ6h.png"
                    alt="Deposit"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {t.step_4_desc}
                </p>
              </div>

              {/* Currency Amounts */}
              <div className="grid grid-cols-2 gap-3" dir="ltr">
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em] mb-1">
                    USD ($)
                  </span>
                  <span className="text-2xl font-black font-mono text-[#3B82F6] drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
                    $5.00
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em] mb-1">
                    EGP (L.E)
                  </span>
                  <span className="text-2xl font-black font-mono text-[#3B82F6] drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
                    250 L.E
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-white/50 px-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>
                  {isArabic
                    ? `يتم تأكيد الإيداع تلقائياً عبر سيرفر Crash Bit فور إتمامه في حسابك.`
                    : 'Deposits verified automatically by Crash Bit server algorithms within seconds.'}
                </span>
              </div>
            </div>
          </div>

          {/* STEP 05: Verify User ID */}
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(59,130,246,0.28)] bg-[#030712]/95 p-4 sm:p-5 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.18)]">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6] font-mono text-xs font-black text-black">
                05
              </span>
              <div>
                <span className="block text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
                  {t.step_5_title}
                </span>
                <h3 className="text-sm font-black text-white">{t.step_5_name}</h3>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 p-1 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/neon-verify-Du9EaZZH.png"
                    alt="Verify"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {isArabic
                    ? `أدخل رقم معرف حسابك (ID) في ${currentPlatform.name} المكون من 10 إلى 15 رقم لتأكيد المزامنة مع كود MXG1:`
                    : `Enter your ${currentPlatform.name} account User ID (10 to 15 digits) to verify synchronization with promo MXG1:`}
                </p>
              </div>

              {/* ID Input */}
              <div>
                <label className="block text-[10px] text-white/50 mb-1.5 uppercase font-black tracking-[0.2em]">
                  {t.userid_label} ({currentPlatform.name})
                </label>
                <div className="relative">
                  <div
                    className={`absolute inset-y-0 ${
                      isArabic ? 'right-0 border-l' : 'left-0 border-r'
                    } border-white/10 flex items-center justify-center px-3.5 pointer-events-none`}
                  >
                    <User className={`w-5 h-5 ${userId ? 'text-[#3B82F6]' : 'text-white/30'}`} />
                  </div>
                  <input
                    type="tel"
                    value={userId}
                    onChange={handleUserIdChange}
                    placeholder={isArabic ? 'مثال: 1829018123' : 'e.g. 1829018123'}
                    maxLength={15}
                    className={`w-full bg-black/70 border text-white font-mono text-lg ${
                      isArabic ? 'pr-14 pl-4 text-right' : 'pl-14 pr-4 text-left'
                    } py-3.5 rounded-xl focus:outline-none transition-all placeholder:text-white/25 ${
                      errors.userId
                        ? 'border-red-500/80 focus:border-red-500 bg-red-950/10'
                        : 'border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    }`}
                  />
                </div>
                {errors.userId && (
                  <p className="text-red-400 text-xs font-bold mt-2">
                    {isArabic
                      ? 'يرجى إدخال رقم ID صحيح مكون من 10 إلى 15 رقماً.'
                      : 'Please enter a valid User ID between 10 and 15 digits.'}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full h-14 rounded-xl bg-gradient-to-l from-[#3B82F6] to-white text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(59,130,246,0.85)] hover:brightness-105"
              >
                <Plane className="w-4 h-4 fill-black" />
                <span>{t.submit_verification}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer info badge */}
        <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center gap-2 text-xs text-white/50">
          <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
          <span>
            {isArabic
              ? 'تشفير رادار آمن متصل بسيرفرات 1xBet · MELBET · spinbetter'
              : 'Secure radar link connected to 1xBet · MELBET · spinbetter'}
          </span>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1 opacity-40">
          <div className="h-px w-12 bg-[rgba(59,130,246,0.4)]" />
          <span className="text-[8px] font-black uppercase tracking-[0.25em] text-white/60 font-mono">
            CRASH BIT TERMINAL · PROMO: MXG1
          </span>
        </div>
      </div>

      {/* Verification Modal */}
      <AnimatePresence>
        {isVerifying && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 p-4 backdrop-blur-2xl"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="relative w-full max-w-[420px] overflow-hidden rounded-[26px] border border-[rgba(59,130,246,0.35)] bg-[#030712] shadow-[0_0_50px_rgba(59,130,246,0.4)]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/[0.07] bg-[rgba(59,130,246,0.06)] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]" />
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#3B82F6] font-mono">
                    Crash Bit · {currentPlatform.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsVerifying(false);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-all hover:text-white active:scale-90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-5 py-6">
                {/* User ID summary card */}
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.08)]">
                    <User className="h-5 w-5 text-[#3B82F6]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] font-black uppercase tracking-[0.24em] text-white/40">
                      {currentPlatform.name} ID
                    </span>
                    <span className="block font-mono text-lg font-black tracking-wider text-white">
                      {userId}
                    </span>
                  </div>
                  <div className="mr-auto rounded-lg border border-[rgba(59,130,246,0.3)] bg-black px-2.5 py-1 font-mono text-xs font-black text-[#3B82F6]">
                    {PROMO_CODE}
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="mt-5 flex flex-col gap-2.5">
                  {[
                    {
                      key: 'step1',
                      text: isArabic
                        ? `فحص ID الحساب على خادم منصة ${currentPlatform.name}`
                        : `Scanning ID on ${currentPlatform.name} server matrix`,
                    },
                    {
                      key: 'step2',
                      text: isArabic
                        ? `مطابقة البروموكود MXG1 ومزامنة الإيداع`
                        : `Validating promo code MXG1 & deposit status`,
                    },
                    {
                      key: 'ready',
                      text: isArabic
                        ? `ربط حسابك برادار طائرة Crash Bit`
                        : `Linking account to Crash Bit flight radar`,
                    },
                  ].map((step, idx) => {
                    const stepOrder = ['step1', 'step2', 'ready'];
                    const currentIdx = stepOrder.indexOf(verifyStep);
                    const isPassed = currentIdx > idx || verifyStep === 'ready';
                    const isCurrent = currentIdx === idx && verifyStep !== 'ready';

                    return (
                      <div
                        key={step.key}
                        className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-all duration-500 ${
                          isPassed
                            ? 'border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.08)]'
                            : isCurrent
                            ? 'border-white/15 bg-white/[0.04]'
                            : 'border-white/[0.06] bg-transparent'
                        }`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black">
                          {isPassed ? (
                            <Check className="h-3.5 w-3.5 text-[#3B82F6] stroke-[3]" />
                          ) : isCurrent ? (
                            <Loader2 className="h-3.5 w-3.5 text-[#3B82F6] animate-spin" />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                          )}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            isPassed ? 'text-white' : isCurrent ? 'text-white/80' : 'text-white/30'
                          }`}
                        >
                          {step.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Continue or waiting message */}
                {verifyStep === 'ready' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <div className="mb-4 flex items-center justify-center gap-2 text-xs font-black text-[#3B82F6]">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>
                        {isArabic
                          ? `تم ربط حساب ${currentPlatform.name} بنجاح`
                          : `${currentPlatform.name} link verified successfully`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleEnterPredictions}
                      className="flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-l from-[#3B82F6] to-white text-sm font-black text-black shadow-[0_16px_40px_-16px_rgba(59,130,246,0.85)] transition-all active:scale-[0.98]"
                    >
                      <Zap className="h-4 w-4 fill-black" />
                      <span>{isArabic ? 'الدخول إلى رادار الطائرة' : 'LAUNCH CRASH BIT RADAR'}</span>
                    </button>
                  </motion.div>
                ) : (
                  <p className="mt-6 text-center text-[10px] font-black uppercase tracking-[0.24em] text-white/35 flex items-center justify-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#3B82F6]" />
                    <span>
                      {isArabic ? 'جاري التحقق والمزامنة... لا تغلق النافذة' : 'Verifying & syncing... Do not close window'}
                    </span>
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
