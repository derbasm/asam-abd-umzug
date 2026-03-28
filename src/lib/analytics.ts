export type TrackingConsent = 'granted' | 'denied';

const CONSENT_STORAGE_KEY = 'tracking-consent-v1';
const CONSENT_COOKIE_NAME = 'tracking-consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getTrackingConsent(): TrackingConsent | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === 'granted' || value === 'denied') {
    return value;
  }

  return null;
}

export function hasTrackingConsent(): boolean {
  return getTrackingConsent() === 'granted';
}

export function setTrackingConsent(consent: TrackingConsent): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  document.cookie = `${CONSENT_COOKIE_NAME}=${consent}; Max-Age=31536000; Path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent('tracking-consent-updated', { detail: consent }));
}

export function trackEvent(eventName: string, parameters: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || !hasTrackingConsent()) {
    return;
  }

  if (typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, parameters);
}
