import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { FC, ReactNode, useEffect } from 'react';

interface RecaptchaProviderProps {
  children: ReactNode;
}

const RecaptchaProvider: FC<RecaptchaProviderProps> = ({ children }) => {
  // Access from Vite's import.meta.env
  const reCaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  
  useEffect(() => {
    // Log key availability on mount
    if (reCaptchaSiteKey) {
      console.log('reCAPTCHA initialized with site key');
    } else {
      console.error('reCAPTCHA site key is missing');
    }
  }, [reCaptchaSiteKey]);

  // If no key is available, render children without the provider
  if (!reCaptchaSiteKey) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaSiteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
      // Show the badge for better user experience and compliance
      container={{
        parameters: {
          badge: 'bottomright',
          theme: 'light',
        }
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default RecaptchaProvider;