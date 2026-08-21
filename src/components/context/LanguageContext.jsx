import {
    createContext,
    useContext,
    useMemo,
    useState,
  } from 'react';
  
  import {
    translations,
  } from '../../services/translations.js';
  
  const LanguageContext = createContext(null);
  
  const supportedLanguages = [
    'en',
    'de',
    'uk',
    'ru',
  ];
  
  const detectLanguage = () => {
    const saved = localStorage.getItem(
      'weather-language',
    );
  
    if (
      saved &&
      supportedLanguages.includes(saved)
    ) {
      return saved;
    }
  
    const browserLanguage =
      navigator.language
        ?.toLowerCase()
        .split('-')[0];
  
    if (browserLanguage === 'uk') {
      return 'uk';
    }
  
    if (browserLanguage === 'ru') {
      return 'ru';
    }
  
    if (browserLanguage === 'de') {
      return 'de';
    }
  
    return 'en';
  };
  
  export function LanguageProvider({
    children,
  }) {
    const [
      language,
      setLanguageState,
    ] = useState(detectLanguage);
  
    const setLanguage = newLanguage => {
      if (
        !supportedLanguages.includes(
          newLanguage,
        )
      ) {
        return;
      }
  
      setLanguageState(newLanguage);
  
      localStorage.setItem(
        'weather-language',
        newLanguage,
      );
  
      document.documentElement.lang =
        newLanguage;
    };
  
    const t = key => {
      const parts = key.split('.');
  
      let value =
        translations[language];
  
      for (const part of parts) {
        value = value?.[part];
      }
  
      if (value !== undefined) {
        return value;
      }
  
      let fallback =
        translations.en;
  
      for (const part of parts) {
        fallback =
          fallback?.[part];
      }
  
      return fallback ?? key;
    };
  
    const value = useMemo(
      () => ({
        language,
        setLanguage,
        t,
      }),
      [language],
    );
  
    return (
      <LanguageContext.Provider
        value={value}
      >
        {children}
      </LanguageContext.Provider>
    );
  }
  
  export function useLanguage() {
    const context =
      useContext(LanguageContext);
  
    if (!context) {
      throw new Error(
        'useLanguage must be used inside LanguageProvider',
      );
    }
  
    return context;
  }