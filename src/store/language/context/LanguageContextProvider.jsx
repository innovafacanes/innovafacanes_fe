import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import LanguageContext from "./LanguageContext";
import { catWords } from "@/languages/cat";
import { esWords } from "@/languages/es";
import { enWords } from "@/languages/en";

const WORDS = { ca: catWords, es: esWords, en: enWords };

const LanguageContextProvider = ({ children }) => {
  const router = useRouter();
  const language = router.locale ?? "ca";

  // Project ids differ per language, so an open popup (?p=) is dropped when switching.
  const setChosenLanguage = useCallback(
    (lang) => {
      const { p, ...query } = router.query;
      router.push({ pathname: router.pathname, query }, undefined, { locale: lang, scroll: false });
    },
    [router]
  );

  const t = useCallback((value) => WORDS[language][value], [language]);

  const languageContextValue = useMemo(
    () => ({ language, setChosenLanguage, t }),
    [language, setChosenLanguage, t]
  );

  return <LanguageContext.Provider value={languageContextValue}>{children}</LanguageContext.Provider>;
};

export default LanguageContextProvider;
