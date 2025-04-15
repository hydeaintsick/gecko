"use client";

import { NextIntlClientProvider } from "next-intl";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

type LocaleContextType = {
  locale: string;
  setAppLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "fr",
  setAppLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

export const languages = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function CustomIntlProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocale] = useState("fr");
  const [messages, setMessages] = useState<any>(null);

  const loadMessages = async (lang: string) => {
    const msgs = await import(`../../messages/${lang}.json`);
    setMessages(msgs);
    setLocale(lang);
    localStorage.setItem("gecko_locale", lang);
  };

  useEffect(() => {
    const saved = localStorage.getItem("gecko_locale");
    const browserLang = navigator.language.split("-")[0];
    const supported = ["fr", "en", "it", "de", "ru", "es"];
    const chosen = supported.includes(saved ?? "")
      ? saved!
      : supported.includes(browserLang)
      ? browserLang
      : "fr";

    loadMessages(chosen);
  }, []);

  const setAppLocale = (lang: string) => {
    if (lang !== locale) {
      loadMessages(lang);
    }
  };

  if (!messages) return null;

  return (
    <LocaleContext.Provider value={{ locale, setAppLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
