import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useState } from 'react';

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const verifyRecaptcha = async (action: string = 'submit_form') => {
    // If reCAPTCHA is not available or initialized
    if (!executeRecaptcha) {
      console.warn('reCAPTCHA not initialized - likely missing site key or not loaded');
      
      // In development, we'll return a fake token to allow form submissions
      const isDevelopment = import.meta.env.DEV;
      if (isDevelopment) {
        console.log('Development mode: Returning mock reCAPTCHA token');
        const mockToken = 'dev_mode_recaptcha_mock_token';
        setRecaptchaToken(mockToken);
        return mockToken;
      }
      
      setRecaptchaError('reCAPTCHA not initialized');
      return null;
    }

    setIsVerifying(true);
    setRecaptchaError(null);

    try {
      const token = await executeRecaptcha(action);
      console.log('reCAPTCHA verification completed for action:', action);
      setRecaptchaToken(token);
      setIsVerifying(false);
      return token;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      setRecaptchaError('Failed to execute reCAPTCHA verification');
      setIsVerifying(false);
      
      // In development, return a mock token to allow form submission
      const isDevelopment = import.meta.env.DEV;
      if (isDevelopment) {
        console.log('Development mode: Returning mock reCAPTCHA token after error');
        const mockToken = 'dev_mode_recaptcha_error_mock_token';
        setRecaptchaToken(mockToken);
        return mockToken;
      }
      
      return null;
    }
  };

  return {
    verifyRecaptcha,
    recaptchaToken,
    isVerifying,
    recaptchaError,
  };
};