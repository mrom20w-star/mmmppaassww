export type PlatformType = '1xbet' | 'melbet' | 'spinbetter';
export type ScreenState = 'splash' | 'settings' | 'crash_game';
export type Language = 'ar' | 'en';

export interface PlatformConfig {
  id: PlatformType;
  name: string;
  taglineAr: string;
  taglineEn: string;
  downloadUrl: string;
  color: string;
  accentGlow: string;
  badge: string;
  latency: string;
  accuracy: string;
}
