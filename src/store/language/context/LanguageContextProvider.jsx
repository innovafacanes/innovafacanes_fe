import { children, useCallback, useMemo, useState } from "react";
import LanguageContext from "./LanguageContext";

const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("ca");

  const setChosenLanguage = useCallback((lang) => {
    setLanguage(lang);
  }, []);

  const languageContextValue = useMemo(
    () => ({
      language,
      setChosenLanguage,
    }),
    [language, setChosenLanguage]
  );

  return (
    <LanguageContext.Provider value={languageContextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
