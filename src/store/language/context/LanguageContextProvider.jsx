import { children, useCallback, useMemo, useState } from "react";
import LanguageContext from "./LanguageContext";
import { catWords } from "@/languages/cat";
import { esWords } from "@/languages/es";
import { enWords } from "@/languages/en";

const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("ca");

  const setChosenLanguage = useCallback((lang) => {
    setLanguage(lang);
  }, []);

  const t = useCallback(
    (value) => {
      if (language === "ca") {
        return catWords[value];
      }
      if (language === "es") {
        return esWords[value];
      }
      if (language === "en") {
        return enWords[value];
      }
    },
    [language]
  );

  const languageContextValue = useMemo(
    () => ({
      language,
      setChosenLanguage,
      t,
    }),
    [language, setChosenLanguage, t]
  );

  return (
    <LanguageContext.Provider value={languageContextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
