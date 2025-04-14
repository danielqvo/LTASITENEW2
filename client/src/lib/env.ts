// Constants for environment variables with defaults - using Vite's import.meta.env
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

// Feature flags
export const isRecaptchaEnabled = Boolean(RECAPTCHA_SITE_KEY);

// Log availability for debugging
console.log(`reCAPTCHA is ${isRecaptchaEnabled ? 'enabled' : 'disabled - no site key available'}`);